module.exports = class Node {
  constructor () {
    if (new.target === Node) {
      throw new TypeError('Cannot construct Abstract instances directly')
    }
  }

  isConnected () {
    throw new Error('isConnected: Implementation Missing!')
  }

  getProvider () {
    throw new Error('getProvider: Implementation Missing!')
  }

  setProvider () {
    throw new Error('setProvider: Implementation Missing!')
  }

  getBalance (address) {
    throw new Error('getBalance: Implementation Missing!')
  }

  setDefaultAccount (account) {
    throw new Error('setDefaultAccount: Implementation Missing!')
  }

  getDefaultAccount () {
    throw new Error('getDefaultAccount: Implementation Missing!')
  }

  getAccounts () {
    throw new Error('getAccounts: Implementation Missing!')
  }

  getLibInstance () {
    throw new Error('getLibInstance: Implementation Missing!')
  }

  registerDataSet (hash, name, location, category, metaHash) {
    throw new Error('registerDataSet: Implementation Missing!')
  }

  registerProcessor (name, pubkey) {
    throw new Error('registerProcessor: Implementation Missing!')
  }

  registerController (name, pubkey) {
    throw new Error('registerController: Implementation Missing!')
  }

  requestProcessing (datasetID, algorithmID, pubKey) {
    throw new Error('requestProcessing: Implementation Missing!')
  }

  notifyProcessor (processorAddress, requestID, encryptedKey) {
    throw new Error('notifyProcessor: Implementation Missing!')
  }
}
