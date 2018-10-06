/* global window, web3: true */

const Web3 = require('web3')
const Node = require('./Node.js')
const DataStoreJSON = require('../contracts/build/contracts/DataStore.json')
const ABI = DataStoreJSON.abi
const _ = require('lodash')
const Promise = require('bluebird')

const NETWORK_ID = '5777'
const CONTRACT_ADDRESS = DataStoreJSON.networks[NETWORK_ID].address

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
    if (!this.isConnected()) {
      throw new BlockchainConnectionError(this.provider.host)
    }

    const totalAccounts = this.getTotalAccounts()

    if (!totalAccounts || totalAccounts === 0) {
      throw new NoETHWalletsError()
    }

    this.setDefaultAccount(this.web3.eth.accounts[0])
    this.contract = this.web3.eth.contract(ABI)
    this.contractInstance = this.contract.at(CONTRACT_ADDRESS)
    this.myAddress = this.getDefaultAccount()

    this.printInfo()
  }

  _initProvider (provider) {
    if (this.isBroswer()) {
      if (!this.isMetaMask()) {
        throw new NoMetamaskError()
      }

      provider = web3.currentProvider
    } else {
      provider = new Web3.providers.HttpProvider(provider)
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
    const host = this._provider || 'MetaMask'
    console.log(`${utc}: Connected to blockchain node: ${host}`)
  }

  isConnected () {
    return this.web3.isConnected()
  }

  getProvider () {
    return this.web3.currentProvider
  }

  setProvider (provider) {
    if (_.isString(provider)) {
      provider = new this.web3.providers.HttpProvider(provider)
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

  getTotalAccounts () {
    return this.web3.eth.accounts.length
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
    // For some reason Promise.promisify is not working on web3.eth.getGasPrice
    // TODO:  Promise.promisify(this.web3.eth.getGasPrice)
    const that = this
    return new Promise(function (resolve, reject) {
      that.web3.eth.getGasPrice((err, res) => {
        if (err) {
          reject(err)
        }

        resolve(res)
      })
    })
  }

  async _callMethod (method, ...args) {
    const gasPrice = await this.getGasPrice() + 1
    let options = { gasPrice: gasPrice, from: this.getDefaultAccount() }

    if (!this.isMetaMask()) {
      const estimateGasAsPromise = Promise.promisify(this.contractInstance[method].estimateGas)
      options.gas = await estimateGasAsPromise(...args)
    }

    const methodAsPromise = Promise.promisify(this.contractInstance[method])
    const out = await methodAsPromise(...args, options)
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
    return this.web3.fromAscii(val)
  }

  fromBytes (bytes) {
    return this.web3.toAscii(bytes)
  }

  registerDataSet (hash, name, location, category, metadata = '') {
    return this._callMethod('registerDataSet', `0x${hash}`, name, location, category, metadata)
  }

  registerProcessor (name, pubkey) {
    // TODO: Account as input given from user
    const account = this.getDefaultAccount()
    return this._callMethod('registerProcessor', account, name, pubkey)
  }

  registerController (name, pubkey) {
    // TODO: Account as input given from user
    const account = this.getDefaultAccount()
    return this._callMethod('registerController', account, name, pubkey)
  }

  requestProcessing (datasetID, algorithmID, pubKey) {
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
