import BaseController from './BaseController'
import node from '../services/Node.js'
import Account from '../db/models/Account'

export default class AccountController extends BaseController {
  constructor () {
    super(Account, '_id')
  }

  list (req, res) {
    let account = {
      address: node.getDefaultAccount(),
      balance: node.getBalance(node.getDefaultAccount())
    }

    return res.json(account)
  }
}
