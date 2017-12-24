import BaseController from './BaseController'
import User from '../db/models/User'

export default class UserController extends BaseController {
  constructor () {
    super(User, '_id')
  }

  list (req, res) {
    let user = {}

    return res.json(user)
  }
}
