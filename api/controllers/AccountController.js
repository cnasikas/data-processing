import BaseController from './BaseController'
import Account from '../db/models/Account'

export default class AccountController extends BaseController {
  constructor (blockchain) {
    super(Account, '_id')
    this.blockchain = blockchain
  }

  async list (req, res) {
    const accounts = await this.blockchain.node.getAccounts()
    let defaultAccount = this.blockchain.node.getDefaultAccount()
    let balance = this.blockchain.node.getBalance(defaultAccount)
    let accountWithBalance = []

    for (let address of accounts) {
      let account = {address: address, balance: this.blockchain.node.getBalance(address)}
      accountWithBalance.push(account)
    }

    let response = {
      accounts: accountWithBalance,
      default: {address: defaultAccount, balance}
    }

    return res.json(response)
  }

  read (req, res, address) {
    let account = {
      address,
      balance: this.blockchain.node.getBalance(address)
    }

    return res.json(account)
  }
}
