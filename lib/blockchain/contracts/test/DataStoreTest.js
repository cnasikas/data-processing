/* global describe, artifacts, contract, it, assert, web3, beforeEach */
/* eslint-disable no-unused-expressions */

const DataStoreContract = artifacts.require('DataStore')

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const { soliditySha3 } = require('web3-utils')
const { entries, cipher } = require('./config')
const { trimNullBytes } = require('./helpers')

chai.use(chaiAsPromised)
const should = chai.should()

const EMPTY_ADDRESS = '0x0000000000000000000000000000000000000000'

const awaitEvent = (event, handler) => {
  return new Promise((resolve, reject) => {
    const wrappedHandler = (...args) => {
      Promise.resolve(handler(...args)).then(resolve).catch(reject)
    }

    event.watch(wrappedHandler)
  })
}

const registerEntity = async (key, entity, account, options = {}) => {
  key = `${key[0].toUpperCase()}${key.slice(1)}`
  const functionKey = `register${key}`
  const tx = await this.dataStore[functionKey](account, web3.fromAscii(entity.name), entity.pubKey, { ...options })
  return tx
}

const registerDataset = async (dataset, account) => {
  const tx = await this.dataStore.registerDataSet(
    dataset.hash,
    web3.fromAscii(dataset.name),
    dataset.location, web3.fromAscii(dataset.category),
    JSON.stringify(dataset.metadata),
    { from: account }
  )
  return tx
}

const requestProcessing = async (dataset, request, account) => {
  const tx = await this.dataStore.requestProcessing(
    dataset.hash,
    web3.fromAscii(request.algorithm),
    request.pubKey,
    { from: account }
  )
  return tx
}

contract('DataStore', (accounts) => {
  beforeEach(async () => {
    this.dataStore = await DataStoreContract.new()
  })

  const contractOwner = accounts[0]
  const processorAccount = accounts[1]
  const controllerAccount = accounts[2]
  const requestorAccount = accounts[3]

  describe('entity registration', () => {
    it('register data processor', async () => {
      await registerEntity('processor', { ...entries.processor }, processorAccount)

      const processor = await this.dataStore.getProcessor.call(processorAccount)

      const [name, pubKey] = processor
      should.equal(trimNullBytes(web3.toAscii(name)), entries.processor.name)
      pubKey.should.equal(entries.processor.pubKey)
    })

    it('listen to data processor event', async () => {
      const { logs } = await registerEntity('processor', { ...entries.processor }, processorAccount)

      const event = logs.find(e => e.event === 'NewProcessor')

      should.exist(event)
      event.args._processorAddress.should.equal(processorAccount)
      should.equal(trimNullBytes(web3.toAscii(event.args.name)), entries.processor.name)
      event.args.pubKey.should.equal(entries.processor.pubKey)
    })

    it('register data controller', async () => {
      await registerEntity('processor', { ...entries.controller }, controllerAccount)

      const controller = await this.dataStore.getProcessor.call(controllerAccount)

      const [name, pubKey] = controller
      should.equal(trimNullBytes(web3.toAscii(name)), entries.controller.name)
      pubKey.should.equal(entries.controller.pubKey)
    })

    it('listen to data controller event', async () => {
      const { logs } = await registerEntity('controller', { ...entries.controller }, controllerAccount)

      const event = logs.find(e => e.event === 'NewController')

      should.exist(event)
      event.args._controllerAddress.should.equal(controllerAccount)
      should.equal(trimNullBytes(web3.toAscii(event.args.name)), entries.controller.name)
      event.args.pubKey.should.equal(entries.controller.pubKey)
    })
  })

  describe('dataset registration', () => {
    it('should register a data set', async () => {
      await registerEntity('controller', { ...entries.controller }, controllerAccount)
      await registerDataset({ ...entries.dataset }, controllerAccount)

      const dataset = await this.dataStore.getDataSetInfo.call(entries.dataset.hash)

      assert.strictEqual(trimNullBytes(web3.toAscii(dataset[0])), entries.dataset.name, 'name should be the same')
      assert.strictEqual(dataset[1], entries.dataset.location, 'location should be the same')
      assert.strictEqual(trimNullBytes(web3.toAscii(dataset[2])), entries.dataset.category, 'category should be the same')
      assert.strictEqual(dataset[3], JSON.stringify(entries.dataset.metadata), 'metadata should be the same')
      assert.deepEqual(JSON.parse(dataset[3]), entries.dataset.metadata, 'metadata objects should be the same')
      assert.strictEqual(dataset[4], controllerAccount, 'controller account should be the same')
    })

    it('listen to dataset registration event', async () => {
      await registerEntity('controller', { ...entries.controller }, controllerAccount)
      const { logs } = await registerDataset({ ...entries.dataset }, controllerAccount)

      const event = logs.find(e => e.event === 'NewDataSet')

      should.exist(event)
      event.args.hash.should.equal(entries.dataset.hash)
      should.equal(trimNullBytes(web3.toAscii(event.args.name)), entries.dataset.name)
      should.equal(trimNullBytes(web3.toAscii(event.args.category)), entries.dataset.category)
      event.args.location.should.equal(entries.dataset.location)
      event.args.metadata.should.equal(JSON.stringify(entries.dataset.metadata))
      assert.deepEqual(JSON.parse(event.args.metadata), entries.dataset.metadata)
      event.args.controller.should.equal(controllerAccount)
    })
  })

  describe('dataset processing', () => {
    it('should request a data processing', async () => {
      const event = this.dataStore.NewRequest()
      await registerEntity('processor', { ...entries.processor }, processorAccount)
      await registerEntity('controller', { ...entries.controller }, controllerAccount)
      await registerDataset({ ...entries.dataset }, controllerAccount)
      await requestProcessing({ ...entries.dataset }, { ...entries.request }, requestorAccount)

      const watcher = async (err, result) => {
        event.stopWatching()
        if (err) { throw err }

        const { _requestID, _dataSetID, _requestor, algorithmID, pubKey } = result.args

        _requestID.should.equal(soliditySha3(entries.dataset.hash, requestorAccount))
        _dataSetID.should.equal(entries.dataset.hash)
        _requestor.should.equal(requestorAccount)
        should.equal(trimNullBytes(web3.toAscii(algorithmID)), entries.request.algorithm)
        pubKey.should.equal(entries.request.pubKey)

        const request = await this.dataStore.getRequestInfo.call(_requestID)

        request[0].should.equal(entries.dataset.hash)
        should.equal(trimNullBytes(web3.toAscii(request[1])), entries.request.algorithm)
        request[2].should.equal(entries.request.pubKey)
        request[3].should.equal(requestorAccount)
      }

      await awaitEvent(event, watcher)
    })

    it('should notify a data processor for data processing', async () => {
      const event = this.dataStore.Process()
      await registerEntity('processor', { ...entries.processor }, processorAccount)
      await registerEntity('controller', { ...entries.controller }, controllerAccount)
      await registerDataset({ ...entries.dataset }, controllerAccount)
      const { logs } = await requestProcessing({ ...entries.dataset }, { ...entries.request }, requestorAccount)
      let { _requestID } = logs[0].args

      await this.dataStore.notifyProcessor(processorAccount, _requestID, JSON.stringify(cipher), { from: controllerAccount })

      const watcher = async (err, result) => {
        event.stopWatching()
        if (err) { throw err }

        let { _processorAddress, _requestID: processRequestID, encryptedKey } = result.args

        processRequestID.should.equal(_requestID)
        _processorAddress.should.equal(processorAccount)
        encryptedKey.should.equal(JSON.stringify(cipher))
        assert.deepEqual(JSON.parse(encryptedKey), cipher, 'cipher objects should be the same')

        const request = await this.dataStore.getRequestProcessingInfo.call(_requestID)

        request[0].should.equal(processorAccount)
        request[1].should.be.false
        request[2].should.be.empty
        request[3].should.be.empty
      }

      await awaitEvent(event, watcher)
    })
  })

  describe('not the contract owner', () => {
    it('cannot register data processor', async () => {
      try {
        await registerEntity('processor', { ...entries.processor }, processorAccount, { from: accounts[4] })
        assert.isTrue(false) // should never reach here
      } catch (error) {
        const processor = await this.dataStore.processors.call(processorAccount)
        processor[2].should.be.false
      }
    })

    it('cannot register data controller', async () => {
      try {
        await registerEntity('controller', { ...entries.controller }, controllerAccount, { from: accounts[4] })
        assert.isTrue(false) // should never reach here
      } catch (error) {
        const controller = await this.dataStore.controllers.call(controllerAccount)
        controller[2].should.be.false
      }
    })
  })

  describe('not a registered entity', () => {
    it('cannot register dataset', async () => {
      try {
        await registerEntity('controller', { ...entries.controller }, controllerAccount, { from: contractOwner })
        await registerDataset({ ...entries.dataset }, accounts[4])
        assert.isTrue(false) // should never reach here
      } catch (error) {
        const dataset = await this.dataStore.dataStore.call(entries.dataset.hash)
        dataset[5].should.be.false
      }
    })
  })

  describe('already registered entities', () => {
    it('cannot register the same data processor', async () => {
      try {
        await registerEntity('processor', { ...entries.processor }, processorAccount, { from: contractOwner })
        await registerEntity('processor', { ...entries.processor }, processorAccount, { from: contractOwner })
        assert.isTrue(false) // should never reach here
      } catch (error) {
        const processor = await this.dataStore.processors.call(processorAccount)
        processor[2].should.be.true
      }
    })

    it('cannot register the same controller', async () => {
      try {
        await registerEntity('controller', { ...entries.controller }, controllerAccount, { from: contractOwner })
        await registerEntity('controller', { ...entries.controller }, controllerAccount, { from: contractOwner })
        assert.isTrue(false) // should never reach here
      } catch (error) {
        const controller = await this.dataStore.controllers.call(controllerAccount)
        controller[2].should.be.true
      }
    })
  })

  describe('cannot request processing', () => {
    it('dataset not exists', async () => {
      let datasetOptions = { ...entries.dataset }
      datasetOptions.hash = '0x1d86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'

      try {
        await registerEntity('processor', { ...entries.processor }, processorAccount, { from: contractOwner })
        await registerEntity('controller', { ...entries.controller }, controllerAccount, { from: contractOwner })
        await registerDataset({ ...entries.dataset }, controllerAccount)

        await requestProcessing({ ...datasetOptions }, { ...entries.request }, requestorAccount)
        assert.isTrue(false) // should never reach here
      } catch (error) {
        const request = await this.dataStore.requests.call(soliditySha3(datasetOptions.hash, requestorAccount))
        request[6].should.be.false
      }
    })

    it('request already exists', async () => {
      try {
        await registerEntity('processor', { ...entries.processor }, processorAccount, { from: contractOwner })
        await registerEntity('controller', { ...entries.controller }, controllerAccount, { from: contractOwner })
        await registerDataset({ ...entries.dataset }, controllerAccount)

        await requestProcessing({ ...entries.dataset }, { ...entries.request }, requestorAccount)
        await requestProcessing({ ...entries.dataset }, { ...entries.request }, requestorAccount)
        assert.isTrue(false) // should never reach here
      } catch (error) {
        const request = await this.dataStore.requests.call(soliditySha3(entries.dataset.hash, requestorAccount))
        request[6].should.be.true
      }
    })
  })

  describe('cannot notify processor', () => {
    it('request does not exists', async () => {
      const requestID = '0x1d86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'

      try {
        await registerEntity('processor', { ...entries.processor }, processorAccount, { from: contractOwner })
        await registerEntity('controller', { ...entries.controller }, controllerAccount, { from: contractOwner })
        await registerDataset({ ...entries.dataset }, controllerAccount)
        await requestProcessing({ ...entries.dataset }, { ...entries.request }, requestorAccount)

        await this.dataStore.notifyProcessor(processorAccount, requestID, JSON.stringify(cipher))
        assert.isTrue(false) // should never reach here
      } catch (error) {
        const request = await this.dataStore.requests.call(requestID)
        request[7].should.be.equal(EMPTY_ADDRESS)
      }
    })

    it('controller is not the owner of the dataset', async () => {
      const requestID = '0x1d86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'

      try {
        await registerEntity('processor', { ...entries.processor }, processorAccount, { from: contractOwner })
        await registerEntity('controller', { ...entries.controller }, controllerAccount, { from: contractOwner })
        await registerDataset({ ...entries.dataset }, controllerAccount)
        await requestProcessing({ ...entries.dataset }, { ...entries.request }, requestorAccount)

        await this.dataStore.notifyProcessor(processorAccount, requestID, JSON.stringify(cipher), { from: accounts[5] })
        assert.isTrue(false) // should never reach here
      } catch (error) {
        const request = await this.dataStore.requests.call(requestID)
        request[7].should.be.equal(EMPTY_ADDRESS)
      }
    })
  })
})
