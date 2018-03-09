const Web3 = require('web3')

/* Should refactor to support prmises when web3@1.0.0 is stable and truffle
* supports it.
* More:
* https://github.com/trufflesuite/truffle-contract/issues/56
* https://ethereum.stackexchange.com/questions/23044/truffle-web3-1-0-0-beta-does-it-work-for-anyone
* https://github.com/trufflesuite/truffle-contract/issues/57
* https://ethereum.stackexchange.com/questions/11444/web3-js-with-promisified-api
*/

module.exports = class EthereumNode {
  constructor (providerURL) {
    this.web3 = new Web3()
    this.providerURL = providerURL
  }

  isConnected () {
    return this.web3.isConnected()
  }

  getProvider () {
    return this.web3.currentProvider
  }

  setProvider () {
    if (!this.web3.currentProvider) {
      this.web3.setProvider(new this.web3.providers.HttpProvider(this.providerURL))
    }
  }

  getBalance (address) {
    return this.web3.fromWei(this.web3.eth.getBalance(address), 'ether').toString(10)
  }

  setDefaultAccount (account) {
    return new Promise((resolve, reject) => {
      this.web3.eth.getAccounts((error, accounts = []) => {
        /* TODO: Is it possible to get empty accounts without an error ?? */
        if (error) {
          reject(error)
        }

        if (accounts.length > 0) {
          this.web3.eth.defaultAccount = accounts[0]
        }

        resolve(accounts)
      })
    })
  }

  getDefaultAccount () {
    return this.web3.eth.defaultAccount
  }

  getAccounts () {
    return new Promise((resolve, reject) => {
      this.web3.eth.getAccounts((error, accounts = []) => {
        if (error) {
          reject(error)
        }

        resolve(accounts)
      })
    })
  }

  getLibInstance () {
    return this.web3
  }

  getFilter (options = {address: this.getDefaultAccount()}) {
    return this.web3.filter(options)
  }

  toBytes (val) {
    return this.web3.fromAscii(val)
  }

  fromBytes (bytes) {
    return this.web3.toAscii(bytes)
  }
}
