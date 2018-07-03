import contract from 'truffle-contract'
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

  registerDataSet (slug, name, location, category, metaHash, hash) {
    const account = this.web3Instance.eth.defaultAccount
    return this.callMethod('registerDataSet', this.toBytes(slug), name, location, category, metaHash, account, hash)
  }

  registerProcessor (name, pubkey) {
    const account = this.web3Instance.eth.defaultAccount
    return this.callMethod('registerProcessor', account, this.toBytes(name), pubkey)
  }

  requestProcessing (datasetSlug, queryID, pubKey) {
    const account = this.web3Instance.eth.defaultAccount
    return this.callMethod('requestProcessing', this.toBytes(datasetSlug), account, this.toBytes(queryID), pubKey)
  }
}

export default Contract
