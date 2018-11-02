/* global describe, artifacts, contract, it, web3, beforeEach */
/* eslint-disable no-unused-expressions */

const DataStoreContract = artifacts.require('DataStore')

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const { entries, cipher } = require('./config')
const { registerEntity, registerDataset, requestProcessing } = require('./helpers')

chai.use(chaiAsPromised)
chai.should()

const EMPTY_ADDRESS = '0x0000000000000000000000000000000000000000'

const addAllProcessors = async (accounts, processorEntityInfo) => {
  for (const account of accounts) {
    const pr = { ...processorEntityInfo }
    pr.account = account
    await registerEntity(this.dataStore, web3, pr)
  }
}

contract('DataStore', (accounts) => {
  beforeEach(async () => {
    this.dataStore = await DataStoreContract.new()
  })

  const processorAccount = accounts[1]
  const controllerAccount = accounts[2]
  const requestorAccount = accounts[3]

  const processorEntityInfo = { key: 'processor', ...entries.processor, account: processorAccount }
  const controllerEntityInfo = { key: 'controller', ...entries.controller, account: controllerAccount }

  describe('Processor List', () => {
    it('should be empty', async () => {
      const list = await this.dataStore.prList.call()
      for (const address of list) {
        address.should.be.equal(EMPTY_ADDRESS)
      }
    })

    it('should initiliaze the list', async () => {
      await registerEntity(this.dataStore, web3, processorEntityInfo)
      const list = await this.dataStore.prList.call()

      for (const address of list) {
        address.should.be.equal(processorAccount)
      }

      const processor = await this.dataStore.processors.call(processorAccount)
      processor[3].should.be.equal(processorAccount)
    })

    it('should add a processor to the list', async () => {
      const pr = { ...processorEntityInfo }
      pr.account = accounts[2]
      await registerEntity(this.dataStore, web3, processorEntityInfo)
      await registerEntity(this.dataStore, web3, pr)

      const [current, head, tail] = await this.dataStore.prList.call()
      current.should.be.equal(processorAccount)
      head.should.be.equal(processorAccount)
      tail.should.be.equal(pr.account)
    })

    it('should link processors correctly', async () => {
      await addAllProcessors(accounts, processorEntityInfo)

      let counter = 0

      for (const account of accounts) {
        const processor = await this.dataStore.processors.call(account)
        let nextProcessorIndex = (counter + 1 > accounts.length - 1) ? 0 : counter + 1
        processor[3].should.be.equal(accounts[nextProcessorIndex])
        counter++
      }
    })

    it('should get the next in line processor', async () => {
      await addAllProcessors(accounts, processorEntityInfo)

      await registerEntity(this.dataStore, web3, controllerEntityInfo)
      await registerDataset(this.dataStore, web3, { ...entries.dataset }, controllerAccount)
      const { logs } = await requestProcessing(this.dataStore, web3, { ...entries.dataset }, { ...entries.request }, requestorAccount)
      let { _requestID } = logs[0].args

      const tx = await this.dataStore.notifyProcessor(_requestID, JSON.stringify(cipher), { from: controllerAccount })
      const notifyArgs = tx.logs[0].args

      const list = await this.dataStore.prList.call()
      notifyArgs._processorAddress.should.be.equal(accounts[0])
      list[0].should.be.equal(accounts[1])
    })
  })
})
