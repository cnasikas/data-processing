import BaseController from './BaseController'
import Request from '../db/models/Request'
import {escapeObject} from 'data-market-utils'

export default class RequestController extends BaseController {
  constructor (blockchain) {
    super(Request, '_id', blockchain)
    this.node = this.blockchain.node
    this.contracts = this.blockchain.contracts
  }

  async list (req, res) {
    try {
      let request = await Request.find().limit(10).sort({created_at: 'desc'})
      res.json(request)
    } catch (err) {
      res.status(500).json({error: err.message})
    }
  }

  async create (req, res) {
    let datasetSlug = req.body.dataset || ''
    datasetSlug = req.sanitize(datasetSlug)
    let account = this.blockchain.node.getDefaultAccount()

    try {
      let instance = await this.contracts.datastore.contract.deployed()
      let dataset = await instance.getDataSetInfo(this.node.toBytes(datasetSlug), {gas: 500000})
      let result = await instance.requestProcessing(this.node.toBytes(datasetSlug), account, {gas: 500000})

      let out = {
        contract_address: this.contracts.datastore.contract.address,
        tx: result.tx,
        account: this.blockchain.node.getDefaultAccount(),
        data: datasetSlug,
        provider: dataset[0],
        processed: false,
        proof: false,
        gasUsed: result.receipt.gasUsed
      }

      let data = await new Request(out).save()
      res.json(escapeObject(data._doc))
    } catch (err) {
      res.status(500).json({error: err.message})
    }
  }

  async read (req, res, id) {
    try {
      let request = await Request.findById(id)
      res.json(escapeObject(request._doc))
    } catch (err) {
      res.status(500).json({error: err.message})
    }
  }
}
