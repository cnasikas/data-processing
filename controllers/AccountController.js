import BaseController from './BaseController'
import node from '../services/Node.js'
import Account from '../db/models/Account'

export default class AccountController extends BaseController {
  constructor () {
    super(Account, '_id')
  }

  list (req, res) {
    node.getAccounts()
    .then((accounts) => {
      return res.json(accounts)
    })
  }

  read (req, res, address) {
    let account = {
      address,
      balance: node.getBalance(address)
    }

    return res.json(account)
  }
}
