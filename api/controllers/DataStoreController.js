import BaseController from './BaseController'
import {Dataset} from '../models'

export default class DataController extends BaseController {
  constructor () {
    super(Dataset, 'dataset', 'datasets')
  }

  async create (req, res) {
    const dataset = req.body

    try {
      await Dataset.create({
        name: dataset.name,
        slug: dataset.slug,
        location: dataset.location,
        category: dataset.category,
        hash: dataset.digest,
        meta_hash: '',
        address_id: 1,
        tx_id: dataset.txId,
        status: 'pending'
      })

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
