import BaseController from './BaseController'
import {Request} from '../models'

export default class RequestController extends BaseController {
  constructor () {
    super(Request, 'request', 'requests')
  }

  async create (req, res) {
    try {
      res.json({})
    } catch (err) {
      res.status(500).json({error: err.message})
    }
  }

  async read (req, res, id) {
    try {
      res.json({})
    } catch (err) {
      res.status(500).json({error: err.message})
    }
  }
}
