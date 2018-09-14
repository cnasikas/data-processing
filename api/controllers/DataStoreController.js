import BaseController from './BaseController'
import {Dataset, Address} from '../models'
import {simpleSave} from '../utils/db'

export default class DataController extends BaseController {
  constructor () {
    super(Dataset, 'dataset', 'datasets')

    this.mapping = {
      id: 'id',
      name: 'name',
      location: 'location',
      category: 'category',
      tx_id: 'tx_id',
      hash: 'hash',
      meta_hash: 'meta_hash',
      status: 'status',
      owner: 'Address.address',
      createdAt: 'createdAt'
    }

    this.options = {
      attributes: [
        'id',
        'name',
        'location',
        'category',
        'tx_id',
        'hash',
        'meta_hash',
        'status',
        'createdAt'
      ],
      include: [
        {
          model: Address,
          attributes: ['address']
        }
      ],
      raw: true
    }
  }

  async list (req, res) {
    try {
      const data = await this.fetch({...this.options})
      res.json(this.normalizeResponse(data, this.mapping))
    } catch (err) {
      res.status(500).json({error: err.message})
    }
  }

  async create (req, res) {
    const dataset = req.body

    try {
      await simpleSave(Dataset, {
        name: dataset.name,
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
      const data = await this.fetch({...this.options}, {hash: id})
      res.json(this.normalizeResponse(data, this.mapping))
    } catch (err) {
      res.status(500).json({error: err.message})
    }
  }
}
