/* global artifacts, contract, it, assert, web3, before */

const DataStoreContract = artifacts.require('DataStore')

const entries = {
  processor: {
    name: 'PR #1',
    pubKey: 'e768dba9090d778ecbeae58d08303c261d698e22c22b19243c6c8d82bcc67ec7c1459f4ff46c24ca64eaa356a39051794d586ca391a364a143beb850ee0ea472'
  },
  controller: {
    name: 'CR #1',
    pubKey: '6b964b635b5203dacf66987c82a771117b1dc63ecd88f05a28545a8b3b2e9fdceff97590e194fc0e43c41bae719fb63bdd8c645c03675ec29ebab497be496257'
  },
  dataset: {
    hash: '0x9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
    name: 'Dataset #1',
    location: 'http://localhost:3001/api/datastore/9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08/get',
    category: 'Health',
    metadata: { iv: '3ec7cf091636fd12d28aeaa5e4d614e6' }
  },
  request: {
    algorithm: 'sum',
    pubKey: 'e768dba9090d778ecbeae58d08303c261d698e22c22b19243c6c8d82bcc67ec7c1459f4ff46c24ca64eaa356a39051794d586ca391a364a143beb850ee0ea472'
  }
}

const cipher = {
  iv: 'yxFOblPX7FXwqdjYQ+n66g==',
  kemtag: 'TOnAb9A65Brr/jnVqHcl3BlQhQeZJFZzs0KHy4Imd0dio/U4AA0Wk8SdVuCe9jkfBCSb/5F07GqUydHBnofXCg==',
  ct: 'SEudP9LiLIlJXLaQA5JG5Bgg9bcwHnPPMjKwt8xuoY+q0B/NQOKOrnF/eKAMuw0hRaUYF7sUCTbHDM/rV4fXYydNTSeOiPZn'
}

const trimNullBytes = (str) => {
  return str.replace(/\0/g, '')
}

const generateEntityTest = (key, registerFuncKey, getFuncKey, args) => {
  return async () => {
    const tx = await this.dataStore[registerFuncKey](args.account, web3.fromAscii(args.name), args.pubKey)
    const entity = await this.dataStore[getFuncKey].call(args.account)

    // const { name: resName, pubKey: resPubKey } = res.logs[0].args
    //
    // assert.strictEqual(trimNullBytes(web3.toAscii(resName)), args.name, `receipt argument ${key} name is not the same`)
    // assert.strictEqual(resPubKey, args.pubKey, `receipt argument ${key} public key is not the same`)

    assert(tx.tx, 'it should have a transaction hash')
    assert.strictEqual(trimNullBytes(web3.toAscii(entity[0])), args.name, `${key} name is not the same`)
    assert.strictEqual(entity[1], args.pubKey, `${key} public key is not the same`)
  }
}

const registerDataset = async (dataset) => {
  const tx = await this.dataStore.registerDataSet(dataset.hash, web3.fromAscii(dataset.name), dataset.location, web3.fromAscii(dataset.category), JSON.stringify(dataset.metadata))
  return tx
}

const requestProcessing = async (dataset, request) => {
  const tx = await this.dataStore.requestProcessing(dataset.hash, web3.fromAscii(request.algorithm), request.pubKey)
  return tx
}

contract('DataStore', (accounts) => {
  before(async () => {
    this.dataStore = await DataStoreContract.deployed()
  })

  const defaultAccount = accounts[0]

  it('should register a data processor',
    generateEntityTest('processor', 'registerProcessor', 'getProcessor', { account: defaultAccount, name: entries.processor.name, pubKey: entries.processor.pubKey })
  )

  it('should register a data controller',
    generateEntityTest('controller', 'registerController', 'getController', { account: defaultAccount, name: entries.controller.name, pubKey: entries.controller.pubKey })
  )

  it('should register a data set', async () => {
    let tx = await registerDataset({ ...entries.dataset })
    assert(tx.tx, 'it should have a transaction hash')

    const dataset = await this.dataStore.getDataSetInfo.call(entries.dataset.hash)

    assert.strictEqual(trimNullBytes(web3.toAscii(dataset[0])), entries.dataset.name, 'name should be the same')
    assert.strictEqual(dataset[1], entries.dataset.location, 'location should be the same')
    assert.strictEqual(trimNullBytes(web3.toAscii(dataset[2])), entries.dataset.category, 'category should be the same')
    assert.strictEqual(dataset[3], JSON.stringify(entries.dataset.metadata), 'metadata should be the same')
    assert.deepEqual(JSON.parse(dataset[3]), entries.dataset.metadata, 'metadata objects should be the same')
    assert.strictEqual(dataset[4], defaultAccount, 'controller account should be the same')
  })

  it('should request a data processing', async () => {
    let tx = await registerDataset({ ...entries.dataset })
    tx = await requestProcessing({ ...entries.dataset }, { ...entries.request })

    const eventName = tx.logs[0].event
    assert.strictEqual(eventName, 'NewRequest', 'event name shoudl be NewRequest')

    const { _requestID, _dataSetID, _requestor, algorithmID, pubKey } = tx.logs[0].args

    const request = await this.dataStore.getRequestInfo.call(_requestID)

    /* Check request contract state */

    assert.strictEqual(request[0], entries.dataset.hash, 'datasetID should be the same')
    assert.strictEqual(trimNullBytes(web3.toAscii(request[1])), entries.request.algorithm, 'algorithm should be the same')
    assert.strictEqual(request[2], entries.request.pubKey, 'public key should be the same')
    assert.strictEqual(request[3], defaultAccount, 'requestor address should be the same')

    /* Check event arguments */

    assert.strictEqual(_requestor, defaultAccount, 'requestor address should be the same')
    assert.strictEqual(_dataSetID, entries.dataset.hash, 'datasetID should be the same')
    assert.strictEqual(trimNullBytes(web3.toAscii(algorithmID)), entries.request.algorithm, 'algorithm should be the same')
    assert.strictEqual(pubKey, entries.request.pubKey, 'public key should be the same')
  })

  it('should notify a data processor for data processing', async () => {
    let tx = await registerDataset({ ...entries.dataset })
    tx = await requestProcessing({ ...entries.dataset }, { ...entries.request })

    let { _requestID } = tx.logs[0].args

    tx = await this.dataStore.notifyProcessor(defaultAccount, _requestID, JSON.stringify(cipher))
    assert(tx.tx, 'it should have a transaction hash')

    const eventName = tx.logs[0].event
    assert.strictEqual(eventName, 'Process', 'event name shoudl be NewRequest')

    let { _processorAddress, _requestID: processRequestID, encryptedKey } = tx.logs[0].args

    assert.strictEqual(processRequestID, _requestID, 'request ID should match')
    assert.strictEqual(_processorAddress, defaultAccount, 'processor address should be the same')
    assert.strictEqual(encryptedKey, JSON.stringify(cipher), 'cipher text should match')
    assert.deepEqual(JSON.parse(encryptedKey), cipher, 'cipher objects should be the same')
  })
})
