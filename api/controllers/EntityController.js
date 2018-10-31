import BaseController from './BaseController'
import { models, methods } from 'data-market-db'

const Address = models.Address
const createWithAddress = methods.createWithAddress

export default class EntityController extends BaseController {
  constructor (model, key, singular) {
    super(model, key, singular)

    this.mapping = {
      id: 'id',
      name: 'name',
      tx_id: 'tx_id',
      pubkey: 'pub_key',
      status: 'status',
      address: 'Address.address',
      createdAt: 'createdAt'
    }

    this.options = {
      attributes: [
        'id',
        'name',
        'tx_id',
        'status',
        'pub_key',
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
      const requests = await this.fetch({ ...this.options })
      res.json(this.normalizeResponse(requests, this.mapping))
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

  async create (req, res) {
    const entity = req.body

    try {
      await createWithAddress(this.model, {
        name: entity.name,
        pub_key: entity.pubkey,
        tx_id: entity.txId,
        status: 'pending'
      }, entity.address)

      res.status(200).json({})
      return res.json()
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: 'Failed saving entity' })
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
