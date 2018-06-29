import BaseController from './BaseController'
import {Dataset} from '../models'

export default class DataController extends BaseController {
  constructor () {
    super(Dataset, 'dataset', 'datasets')
  }

  async create (req, res) {
    try {
      return res.json({})
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
