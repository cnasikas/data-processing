import BaseController from './BaseController'
import blockchain from 'blockchain'
import Account from '../db/models/Account'

export default class AccountController extends BaseController {
  constructor () {
    super(Account, '_id')
    this.blockchain = blockchain()
  }

  list (req, res) {
    this.blockchain.node.getAccounts()
    .then((accounts) => {
      let address = this.blockchain.node.getDefaultAccount()
      let balance = this.blockchain.node.getBalance(address)

      let response = {
        accounts,
        default: {address, balance}
      }

      return res.json(response)
    })
  }

  read (req, res, address) {
    let account = {
      address,
      balance: this.blockchain.node.getBalance(address)
    }

    return res.json(account)
  }
}
