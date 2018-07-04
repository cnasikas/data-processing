import _ from 'lodash'
import BaseController from './BaseController'
import {Dataset, Address} from '../models'

export default class DataController extends BaseController {
  constructor () {
    super(Dataset, 'dataset', 'datasets')
  }

  normalizeResponse (datasets) {
    return datasets.map(item => ({
      'id': item.id,
      'name': item.name,
      'slug': item.slug,
      'location': item.location,
      'category': item.category,
      'tx_id': item.tx_id,
      'hash': item.hash,
      'meta_hash': item.meta_hash,
      'status': item.status,
      'owner': item['Address.hash'],
      createdAt: item.createdAt || null
    }))
  }

  async fetchDatasets (id = '') {
    let options = {
      attributes: [
        'id',
        'name',
        'slug',
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
          attributes: ['hash']
        }
      ],
      raw: true
    }

    if (!_.isEmpty(id)) {
      options.where = {hash: id}
    }

    return Dataset.findAll(options) // hashes are unique so findAll will return only one result
  }

  async list (req, res) {
    try {
      const data = await this.fetchDatasets()
      res.json(this.normalizeResponse(data))
    } catch (err) {
      res.status(500).json({error: err.message})
    }
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
      const data = await this.fetchDatasets(id)
      res.json(this.normalizeResponse(data))
    } catch (err) {
      res.status(500).json({error: err.message})
    }
  }
}
