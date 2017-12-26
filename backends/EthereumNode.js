import Web3 from 'web3'
import truffle from '../truffle.js'

/* Should refactor to support prmises when web3@1.0.0 is stable and truffle
* supports it.
* More:
* https://github.com/trufflesuite/truffle-contract/issues/56
* https://ethereum.stackexchange.com/questions/23044/truffle-web3-1-0-0-beta-does-it-work-for-anyone
* https://github.com/trufflesuite/truffle-contract/issues/57
* https://ethereum.stackexchange.com/questions/11444/web3-js-with-promisified-api
*/

export default class EthereumNode {
  constructor () {
    this.web3 = new Web3()
    this.providerURL = 'http://' + truffle.networks.development.host + ':' + truffle.networks.development.port
    this.setProvider()
    this.setDefaultAccount()
  }

  isConnected () {
    return this.web3.isConnected()
  }

  getProvider () {
    return this.web3.currentProvider
  }

  setProvider () {
    this.web3.setProvider(new this.web3.providers.HttpProvider(this.providerURL))
  }

  getBalance (address) {
    return this.web3.fromWei(this.web3.eth.getBalance(address), 'ether').toString(10)
  }

  setDefaultAccount (account) {
    return new Promise((resolve, reject) => {
      this.web3.eth.getAccounts((error, accounts) => {
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

  getLibInstance () {
    return this.web3
  }
}
