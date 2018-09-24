import BaseController from './BaseController'
import blockchain from 'blockchain'

export default class AccountController extends BaseController {
  constructor () {
    super('Account', '_id')
    this.ledger = blockchain()
    this.provider = process.env.PROVIDER || 'http://localhost:7545'
    this.node = new this.ledger.NodeClass(this.provider)
  }

  async list (req, res) {
    const accounts = await this.node.getAccounts()
    let defaultAccount = this.node.getDefaultAccount()
    let balance = this.node.getBalance(defaultAccount)
    let accountWithBalance = []

    for (let address of accounts) {
      let account = { address: address, balance: this.node.getBalance(address) }
      accountWithBalance.push(account)
    }

    let response = {
      accounts: accountWithBalance,
      default: { address: defaultAccount, balance }
    }

    return res.json(response)
  }

  async read (req, res, address) {
    let account = {
      address,
      balance: this.node.getBalance(address)
    }

    return res.json(account)
  }
}
