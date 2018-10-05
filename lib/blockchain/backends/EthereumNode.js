/* global window, web3: true */

const Web3 = require('web3')
const contract = require('truffle-contract')
const Node = require('./Node.js')
const DataStore = require('../contracts/build/contracts/DataStore.json')
const _ = require('lodash')
const Promise = require('bluebird')

class NoMetamaskError extends Error {
  constructor (...params) {
    super(...params)
    this.message = 'MetaMask must be installed and enabled.'
  }
}

/* eslint-disable-next-line no-unused-vars */
class GenericTransactionError extends Error {
  constructor (...params) {
    super(...params)
    this.message = 'There was an error processing the transaction. Try again.'
  }
}

/* eslint-disable-next-line no-unused-vars */
class TransactionDeniedError extends Error {
  constructor (...params) {
    super(...params)
    this.message = 'The transaction was denied.'
  }
}

class NoETHWalletsError extends Error {
  constructor (...params) {
    super(...params)
    this.message = 'No available ETH wallets were found.'
  }
}

class BlockchainConnectionError extends Error {
  constructor (provider = '') {
    super()
    this.message = `Cannot connect to blockchain: ${provider}`
  }
}

/* Should refactor to support prmises when web3@1.0.0 is stable and truffle
* supports it.
* More:
* https://github.com/trufflesuite/truffle-contract/issues/56
* https://ethereum.stackexchange.com/questions/23044/truffle-web3-1-0-0-beta-does-it-work-for-anyone
* https://github.com/trufflesuite/truffle-contract/issues/57
* https://ethereum.stackexchange.com/questions/11444/web3-js-with-promisified-api
*/

module.exports = class EthereumNode extends Node {
  constructor (provider = null) {
    super()
    this._provider = provider
    this.provider = this._initProvider(this._provider)
    this.web3 = new Web3(this.provider)

    this.contractFunctionsKeys = [
      'registerDataSet',
      'registerProcessor',
      'registerController',
      'requestProcessing',
      'notifyProcessor'
    ]
  }

  async init () {
    await this.isConnected()
    const totalAccounts = await this.getTotalAccountsSize()

    if (!totalAccounts || totalAccounts === 0) {
      throw new NoETHWalletsError()
    }

    const accounts = await this.web3.eth.getAccounts()
    this.setDefaultAccount(accounts[0])
    this.contractArtifact = contract(DataStore)
    this.contractArtifact.setProvider(this.getProvider())
    this.contract = await this.contractArtifact.deployed()
    this.myAddress = this.getDefaultAccount()

    // this._exportContractFuntions(this.contractFunctionsKeys)

    this.printInfo()
  }

  _initProvider (provider) {
    if (this.isBroswer()) {
      if (!this.isMetaMask()) {
        throw new NoMetamaskError()
      }

      provider = web3.currentProvider
    } else {
      provider = new Web3.providers.WebsocketProvider(provider)
    }

    return provider
  }

  _exportContractFuntions (keys) {
    for (const func of keys) {
      this[func] = async (...args) => {
        const out = await this._callMethod(func, ...args)
        return out
      }
    }
  }

  printInfo () {
    const utc = new Date().toUTCString()
    console.log(utc + ': Connected to blockchain node: ' + this.web3.isConnected())
  }

  async isConnected () {
    try {
      return await this.web3.eth.net.isListening()
    } catch (err) {
      console.log(err)
      throw new BlockchainConnectionError(this.getProvider().host)
    }
  }

  getProvider () {
    return this.web3.currentProvider
  }

  setProvider (provider) {
    if (_.isString(provider)) {
      provider = new this.web3.providers.WebsocketProvider(provider)
    }

    this.web3.setProvider(provider)
  }

  isBroswer () {
    return typeof window !== 'undefined' && typeof window.web3 !== 'undefined'
  }

  isMetaMask () {
    return this.isBroswer() && web3.currentProvider.isMetaMask
  }

  getDefaultAccount (account) {
    return this.web3.eth.defaultAccount
  }

  setDefaultAccount (account) {
    this.web3.eth.defaultAccount = account
  }

  async getTotalAccountsSize () {
    const accounts = await this.web3.eth.getAccounts()
    return accounts.length
  }

  async getBalance (address) {
    const getBalance = Promise.promisify(this.web3.eth.getBalance)
    const balance = await getBalance(address)
    return this.web3.fromWei(balance, 'ether').toString(10)
  }

  async getAccounts () {
    const getAccounts = Promise.promisify(this.web3.eth.getAccounts)
    const accounts = await getAccounts()
    return accounts
  }

  getGasPrice () {
    return this.web3.eth.getGasPrice()
  }

  async _callMethod (method, ...args) {
    const gasPrice = await this.getGasPrice() + 1
    let options = { gasPrice: gasPrice, from: this.getDefaultAccount() }
    const instance = await this.contract.deployed()

    if (!this.isMetaMask()) {
      options.gas = await instance[method].estimateGas(...args)
    }

    const out = await instance[method](...args, options)
    return out
  }

  getLibInstance () {
    return this.web3
  }

  getFilter (options = { fromBlock: 'latest', toBlock: 'latest' }) {
    return this.web3.eth.filter(options)
  }

  isHexStrict (hex) {
    // https://github.com/ethereum/web3.js
    return (_.isString(hex) || _.isNumber(hex)) && /^(-)?0x[0-9a-f]*$/i.test(hex)
  }

  bytesToHex (bytes) {
    // https://github.com/ethereum/web3.js
    for (var hex = [], i = 0; i < bytes.length; i++) {
      hex.push((bytes[i] >>> 4).toString(16))
      hex.push((bytes[i] & 0xF).toString(16))
    }

    return '0x' + hex.join('')
  }

  hexToBytes (hex) {
    // https://github.com/ethereum/web3.js
    hex = hex.toString(16)

    if (!this.isHexStrict(hex)) {
      throw new Error('Given value "' + hex + '" is not a valid hex string.')
    }

    hex = hex.replace(/^0x/i, '')

    for (var bytes = [], c = 0; c < hex.length; c += 2) {
      bytes.push(parseInt(hex.substr(c, 2), 16))
    }

    return bytes
  }

  toBytes (val) {
    return this.web3.utils.stringToHex(val)
  }

  fromBytes (bytes) {
    return this.web3.utils.hexToString(bytes)
  }

  registerDataSet (hash, name, location, category, metadata = '') {
    name = this.toBytes(name)
    category = this.toBytes(category)
    return this._callMethod('registerDataSet', `0x${hash}`, name, location, category, metadata)
  }

  registerProcessor (name, pubkey) {
    // TODO: Account as input given from user
    const account = this.getDefaultAccount()
    name = this.toBytes(name)
    return this._callMethod('registerProcessor', account, name, pubkey)
  }

  registerController (name, pubkey) {
    // TODO: Account as input given from user
    const account = this.getDefaultAccount()
    name = this.toBytes(name)
    return this._callMethod('registerController', account, name, pubkey)
  }

  requestProcessing (datasetID, algorithmID, pubKey) {
    algorithmID = this.toBytes(algorithmID)
    return this._callMethod('requestProcessing', `0x${datasetID}`, algorithmID, pubKey)
  }

  notifyProcessor (processorAddress, requestID, encryptedKey) {
    return this._callMethod('notifyProcessor', processorAddress, requestID, encryptedKey)
  }

  getProcessor (address) {
    return this._callMethod('getProcessor', address)
  }

  getRequestInfo (requestID) {
    return this._callMethod('getRequestInfo', requestID)
  }

  getDataSetInfo (dataSetID) {
    return this._callMethod('getDataSetInfo', dataSetID)
  }
}
