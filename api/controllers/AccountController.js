import BaseController from './BaseController'

export default class AccountController extends BaseController {
  constructor () {
    super('Account', '_id')
  }

  async list (req, res) {
    const blockchain = req.app.blockchain
    const accounts = await blockchain.node.getAccounts()
    let defaultAccount = blockchain.node.getDefaultAccount()
    let balance = blockchain.node.getBalance(defaultAccount)
    let accountWithBalance = []

    for (let address of accounts) {
      let account = {address: address, balance: blockchain.node.getBalance(address)}
      accountWithBalance.push(account)
    }

    let response = {
      accounts: accountWithBalance,
      default: {address: defaultAccount, balance}
    }

    return res.json(response)
  }

  read (req, res, address) {
    const blockchain = req.app.blockchain
    let account = {
      address,
      balance: blockchain.node.getBalance(address)
    }

    return res.json(account)
  }
}
