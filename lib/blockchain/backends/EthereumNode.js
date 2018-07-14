const Web3 = require('web3')
const contract = require('truffle-contract')
const Node = require('./Node.js')
const DataStore = require('../../../blockchain/build/contracts/DataStore.json')
const _ = require('lodash')

class BlockchainConnectionError extends Error {
  constructor (...params) {
    super(...params)
    this.message = 'Cannot connect to Blockchain node'
  }
}

class GenericTransactionError extends Error {
  constructor (...params) {
    super(...params)
    this.message = 'There was an error processing the transaction. Try again.'
  }
}

class TransactionDeniedError extends Error {
  constructor (...params) {
    super(...params)
    this.message = 'The transaction was denied.'
  }
}

class NoETHWalletsError extends Error {
  constructor (...params) {
    super(...params)
    this.message = 'No available ETH wallets were found on MetaMask.'
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
  constructor (provider) {
    super()
    this.web3Instance = new Web3()
    this.setProvider(provider)
    this.web3Instance.eth.defaultAccount = this.web3Instance.eth.accounts[0]

    if (!this.isConnected()) {
      throw new BlockchainConnectionError()
    }

    if (!this.web3Instance.eth.accounts.length) {
      throw new NoETHWalletsError()
    }

    const contractInstance = contract(DataStore)
    contractInstance.setProvider(this.getProvider())
    this.contractInstance = contractInstance
  }

  isConnected () {
    return this.web3Instance.isConnected()
  }

  getProvider () {
    return this.web3Instance.currentProvider
  }

  setProvider (provider) {
    if (_.isString(provider)) {
      provider = new this.web3Instance.providers.HttpProvider(provider)
    }

    this.web3Instance.setProvider(provider)
  }

  getBalance (address) {
    return this.web3Instance.fromWei(this.web3Instance.eth.getBalance(address), 'ether').toString(10)
  }

  getDefaultAccount () {
    return this.web3Instance.eth.defaultAccount
  }

  getAccounts () {
    return new Promise((resolve, reject) => {
      this.web3Instance.eth.getAccounts((error, accounts = []) => {
        if (error) {
          reject(error)
        }

        resolve(accounts)
      })
    })
  }

  getLibInstance () {
    return this.web3Instance
  }

  getFilter (options = {fromBlock: 'latest', toBlock: 'latest'}) {
    return this.web3Instance.eth.filter(options)
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
    return this.web3Instance.fromAscii(val)
  }

  fromBytes (bytes) {
    return this.web3Instance.toAscii(bytes)
  }

  async callMethod (method, ...args) {
    console.log(args)
    const gasPrice = await new Promise((resolve, reject) => {
      this.web3Instance.eth.getGasPrice((err, res) => {
        if (err) {
          return reject(new GenericTransactionError())
        }

        resolve(res + 1)
      })
    })

    try {
      const instance = await this.contractInstance.deployed()
      return await instance[method](...args, {from: this.web3Instance.eth.defaultAccount, gasPrice: gasPrice})
    } catch (err) {
      if (err.message.includes('User denied')) {
        throw new TransactionDeniedError()
      }

      throw new GenericTransactionError()
    }
  }

  registerDataSet (hash, name, location, category) {
    // TODO: Store metaHash. For the moment is an empty string
    return this.callMethod('registerDataSet', this.toBytes(hash), this.toBytes(name), location, this.toBytes(category), this.toBytes(''))
  }

  registerProcessor (name, pubkey) {
    // TODO: Account as input given from user
    const account = this.web3Instance.eth.defaultAccount
    return this.callMethod('registerProcessor', account, this.toBytes(name), pubkey)
  }

  registerController (name, pubkey) {
    // TODO: Account as input given from user
    const account = this.web3Instance.eth.defaultAccount
    return this.callMethod('registerController', account, this.toBytes(name), pubkey)
  }

  requestProcessing (datasetID, algorithmID, pubKey) {
    return this.callMethod('requestProcessing', this.toBytes(`0x${datasetID}`), this.toBytes(algorithmID), pubKey)
  }

  notifyProcessor (processorAddress, requestID, encryptedKey) {
    this.callMethod('notifyProcessor', processorAddress, requestID, encryptedKey)
  }
}
