import BaseController from './BaseController'
import {Processor, Address} from '../models'
import {simpleSave} from '../utils/db'

export default class ProcessorController extends BaseController {
  constructor () {
    super(Processor, 'processor', 'processors')

    this.mapping = {
      id: 'id',
      name: 'name',
      tx_id: 'tx_id',
      pubkey: 'pub_key',
      status: 'status',
      owner: 'Address.hash',
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
      const requests = await this.fetch({...this.options})
      res.json(this.normalizeResponse(requests, this.mapping))
    } catch (err) {
      res.status(500).json({error: err.message})
    }
  }

  async create (req, res) {
    const processor = req.body

    try {
      await simpleSave(Processor, {
        name: processor.name,
        pub_key: processor.pubkey,
        address_id: 1,
        tx_id: processor.txId,
        status: 'pending'
      })

      res.status(200).json({})
      return res.json()
    } catch (err) {
      console.log(err)
      res.status(500).json({error: 'Failed saving pending processor'})
    }
  }

  async read (req, res, id) {
    try {
      const request = await this.fetch({...this.options}, {id: id})
      res.json(this.normalizeResponse(request, this.mapping))
    } catch (err) {
      res.status(500).json({error: err.message})
    }
  }
}
