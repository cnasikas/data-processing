import Web3 from 'web3'
import truffle from '../truffle.js'

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
    /* Should return a promise https://ethereum.stackexchange.com/questions/11444/web3-js-with-promisified-api */
    this.web3.eth.getAccounts((error, accounts) => {
      if (!error && accounts.length > 0) {
        this.web3.eth.defaultAccount = accounts[0]
      }
    })
  }

  getDefaultAccount () {
    return this.web3.eth.defaultAccount
  }

  getLibInstance () {
    return this.web3
  }
}
