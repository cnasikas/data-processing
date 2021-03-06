import BaseController from './BaseController'
import { models, methods } from 'data-market-db'

const Address = models.Address
const Request = models.Request
const Dataset = models.Dataset
const Algorithm = models.Algorithm
const Processor = models.Processor
const createRequest = methods.createRequest

export default class RequestController extends BaseController {
  constructor () {
    super(Request, 'request', 'requests')

    this.mapping = {
      id: 'id',
      blockchain_id: 'blockchain_id',
      dataset: 'Dataset.hash',
      algorithm: 'Algorithm.name',
      tx_id: 'tx_id',
      pubkey: 'pub_key',
      status: 'status',
      processed: 'processed',
      requestor: 'Address.address',
      controller: 'Dataset.Address.address',
      processor: 'Processor.Address.address',
      createdAt: 'createdAt'
    }

    this.options = {
      attributes: [
        'id',
        'blockchain_id',
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
          attributes: ['hash'],
          include: [{
            model: Address,
            attributes: ['address']
          }]
        },
        {
          model: Algorithm,
          attributes: ['name']
        },
        {
          model: Processor,
          attributes: ['id'],
          include: [{
            model: Address,
            attributes: ['address']
          }]
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
      await createRequest(request.dataset, {
        tx_id: request.txId,
        algorithm_id: request.query,
        status: 'pending',
        processed: false,
        pub_key: request.pubkey
      }, request.address)

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
