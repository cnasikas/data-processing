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
      let address = node.getDefaultAccount()
      let balance = node.getBalance(address)

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
      balance: node.getBalance(address)
    }

    return res.json(account)
  }
}
