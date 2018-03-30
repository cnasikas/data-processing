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
}
