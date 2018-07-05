import contract from 'truffle-contract'
import _ from 'lodash'
import contractScheme from './contractScheme'

class NoMetamaskError extends Error {
  constructor (...params) {
    super(...params)
    this.message = 'MetaMask must be installed and enabled.'
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

class Contract {
  constructor (contractABI) {
    /* global web3 Web3:true */

    if (!window['web3'] || !web3.currentProvider.isMetaMask) {
      throw new NoMetamaskError()
    }

    const web3Instance = new Web3(web3.currentProvider)
    const contractInstance = contract(contractScheme)
    contractInstance.setProvider(web3.currentProvider)

    web3Instance.eth.defaultAccount = web3Instance.eth.accounts[0]

    if (!web3Instance.eth.accounts.length) {
      throw new NoETHWalletsError()
    }

    // const contractApi = web3Instance.eth.contract(contractAbi)
    // this.contractInstance = contractApi.at(CONTRACT_ADDRESS)

    this.myAddress = web3Instance.eth
    this.web3Instance = web3Instance
    this.constractInstance = contractInstance
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
    const gasPrice = await new Promise((resolve, reject) => {
      this.web3Instance.eth.getGasPrice((err, res) => {
        if (err) {
          return reject(new GenericTransactionError())
        }

        resolve(res + 1)
      })
    })

    try {
      const instance = await this.constractInstance.deployed()
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
    return this.callMethod('registerDataSet', this.hexToBytes(`0x${hash}`), this.toBytes(name), location, this.toBytes(category), this.toBytes(''))
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
    return this.callMethod('requestProcessing', this.hexToBytes(`0x${datasetID}`), this.toBytes(algorithmID), pubKey)
  }

  notifyProcessor (processorAddress, requestID, encryptedKey) {
    this.callMethod('notifyProcessor', processorAddress, requestID, encryptedKey)
  }
}

export default Contract
