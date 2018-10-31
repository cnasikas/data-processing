import BaseController from './BaseController'
import { models, methods } from 'data-market-db'

const Dataset = models.Dataset
const Address = models.Address
const createWithAddress = methods.createWithAddress

export default class DataController extends BaseController {
  constructor () {
    super(Dataset, 'datasets', 'dataset')

    this.mapping = {
      id: 'id',
      name: 'name',
      location: 'location',
      category: 'category',
      tx_id: 'tx_id',
      hash: 'hash',
      metadata: 'metadata',
      status: 'status',
      controller: 'Address.address',
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
        'metadata',
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
      const data = await this.fetch({ ...this.options })
      res.json(this.normalizeResponse(data, this.mapping))
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

  async create (req, res) {
    const dataset = req.body

    try {
      await createWithAddress(Dataset, {
        name: dataset.name,
        location: dataset.location,
        category: dataset.category,
        hash: dataset.digest,
        metadata: JSON.stringify({ iv: dataset.iv }),
        tx_id: dataset.txId,
        status: 'pending'
      }, dataset.address)

      return res.json({})
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

  async read (req, res, id) {
    try {
      const data = await this.fetch({ ...this.options }, { hash: id })
      res.json(this.normalizeResponse(data, this.mapping))
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }
}
