/* global describe, artifacts, contract, it, beforeEach, before, web3, assert */

/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-expressions */

const fs = require('fs')
const util = require('util')
const path = require('path')
const BigNumber = web3.BigNumber
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const chaiBignumber = require('chai-bignumber')(BigNumber)

const { parseProof, normalizeProof, registerEntity, registerDataset, requestProcessing } = require('./helpers')
const { entries, cipher } = require('./config')

const ProofStoreContract = artifacts.require('ProofStore')
const DataStoreContract = artifacts.require('DataStore')

chai.use(chaiAsPromised).use(chaiBignumber)
const should = chai.should()

const readFile = util.promisify(fs.readFile)

const saveProof = async (requestID, account) => {
  const tx = await this.proofStore.addProof(requestID, ...Object.values(this.proof), { from: account })
  return tx
}

const awaitEvent = (event, handler) => {
  return new Promise((resolve, reject) => {
    const wrappedHandler = (...args) => {
      Promise.resolve(handler(...args)).then(resolve).catch(reject)
    }

    event.watch(wrappedHandler)
  })
}

contract('ProofStore', (accounts) => {
  before(async () => {
    const proof = await readFile(path.join(__dirname, 'proof'))

    this.proof = parseProof(proof.toString().replace(/\n/g, ' ').split(' '))
  })

  beforeEach(async () => {
    this.dataStore = await DataStoreContract.new()
    this.proofStore = await ProofStoreContract.new(this.dataStore.address)
  })

  const contractOwner = accounts[1]
  const processorAccount = accounts[1]
  const controllerAccount = accounts[2]
  const requestorAccount = accounts[3]

  const processorEntityInfo = { key: 'processor', ...entries.processor, account: processorAccount }
  const controllerEntityInfo = { key: 'controller', ...entries.controller, account: controllerAccount }

  describe('addresses', () => {
    it('successfully saves the address of the datastore contract', async () => {
      const dataStoreAddress = await this.proofStore.dataStoreAddress.call()
      dataStoreAddress.should.be.equal(this.dataStore.address)
    })
  })

  describe('proofs', () => {
    it('successfully saves a proof', async () => {
      const event = this.proofStore.NewProof()
      await registerEntity(this.dataStore, web3, processorEntityInfo)
      await registerEntity(this.dataStore, web3, controllerEntityInfo)
      await registerDataset(this.dataStore, web3, { ...entries.dataset }, controllerAccount)

      const { logs } = await requestProcessing(this.dataStore, web3, { ...entries.dataset }, { ...entries.request }, requestorAccount)
      let { _requestID } = logs[0].args

      await this.dataStore.notifyProcessor(processorAccount, _requestID, JSON.stringify(cipher), { from: controllerAccount })

      const { logs: proofLogs } = await saveProof(_requestID, processorAccount)

      let proofEvent = proofLogs.find(e => e.event === 'NewProof')
      should.exist(proofEvent)
      proofEvent.args._requestID.should.equal(_requestID)

      const watcher = async (err, result) => {
        event.stopWatching()
        if (err) { throw err }

        const { _requestID } = result.args

        _requestID.should.equal(_requestID)
      }

      await awaitEvent(event, watcher)

      let proof = await this.proofStore.getProof.call(_requestID)

      proof = normalizeProof(proof)

      for (var key in proof) {
        if (Array.isArray(proof[key][0])) {
          proof[key][0][0].should.be.bignumber.equal(this.proof[key][0][0])
          proof[key][0][1].should.be.bignumber.equal(this.proof[key][0][1])

          proof[key][1][0].should.be.bignumber.equal(this.proof[key][1][0])
          proof[key][1][1].should.be.bignumber.equal(this.proof[key][1][1])
        } else {
          proof[key][0].should.be.bignumber.equal(this.proof[key][0])
          proof[key][1].should.be.bignumber.equal(this.proof[key][1])
        }
      }
    })
  })

  describe('cannot save proofs', () => {
    it('request not exist', async () => {
      const requestID = '0x5d86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'
      try {
        await saveProof(requestID, contractOwner)
        assert.isTrue(false) // should never reach here
      } catch (error) {
        const hasProof = await this.proofStore.hasProof.call(requestID)
        hasProof.should.be.false
      }
    })

    it('unassigned processor', async () => {
      let requestID
      try {
        await registerEntity(this.dataStore, web3, processorEntityInfo)
        await registerEntity(this.dataStore, web3, controllerEntityInfo)
        await registerDataset(this.dataStore, web3, { ...entries.dataset }, controllerAccount)

        const { logs } = await requestProcessing(this.dataStore, web3, { ...entries.dataset }, { ...entries.request }, requestorAccount)
        let { _requestID } = logs[0].args
        requestID = _requestID
        await saveProof(_requestID, processorAccount)
        assert.isTrue(false) // should never reach here
      } catch (error) {
        const hasProof = await this.proofStore.hasProof.call(requestID)
        hasProof.should.be.false
      }
    })
  })

  describe('not the contract owner', () => {
    it('cannot change the datastore contract', async () => {
      try {
        await this.dataStore.changeDataStore(accounts[5], { from: accounts[4] })
        assert.isTrue(false) // should never reach here
      } catch (error) {
        const dataStoreAddress = await this.proofStore.dataStoreAddress.call()
        dataStoreAddress.should.be.equal(this.dataStore.address)
      }
    })
  })
})
