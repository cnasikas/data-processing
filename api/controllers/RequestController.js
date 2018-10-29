import BaseController from './BaseController'
import { models, methods } from 'data-market-db'

const Address = models.Address
const Request = models.Request
const Dataset = models.Dataset
const Algorithm = models.Algorithm
const saveRequest = methods.saveRequest

export default class RequestController extends BaseController {
  constructor () {
    super(Request, 'request', 'requests')

    this.mapping = {
      id: 'id',
      dataset: 'Dataset.hash',
      algorithm: 'Algorithm.name',
      tx_id: 'tx_id',
      pubkey: 'pub_key',
      status: 'status',
      processed: 'processed',
      requestor: 'Address.address',
      createdAt: 'createdAt'
    }

    this.options = {
      attributes: [
        'id',
        'tx_id',
        'status',
        'pub_key',
        'processed',
        'createdAt'
      ],
      include: [
        {
          model: Address,
          attributes: ['address']
        },
        {
          model: Dataset,
          attributes: ['hash']
        },
        {
          model: Algorithm,
          attributes: ['name']
        }
      ],
      raw: true
    }
  }

  async list (req, res) {
    try {
      const requests = await this.fetch({ ...this.options })
      res.json(this.normalizeResponse(requests, this.mapping))
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

  async create (req, res) {
    const request = req.body

    try {
      await saveRequest(request.dataset, {
        address_id: 1,
        tx_id: request.txId,
        algorithm_id: 1, // request.query
        status: 'pending',
        processed: false,
        pub_key: request.pubkey
      })

      res.json({})
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

  async read (req, res, id) {
    try {
      const request = await this.fetch({ ...this.options }, { id: id })
      res.json(this.normalizeResponse(request, this.mapping))
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }
}
