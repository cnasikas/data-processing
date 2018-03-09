import BaseController from './BaseController'
import blockchain from 'blockchain'
import Request from '../db/models/Request'

export default class RequestController extends BaseController {
  constructor () {
    super(Request, '_id')
    this.blockchain = blockchain()
    this.node = this.blockchain.node
    this.contracts = new this.blockchain.ContractService().getContracts()
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
    let account = this.blockchain.node.getDefaultAccount()

    try {
      let instance = await this.contracts.datastore.contract.deployed()
      let dataset = await instance.getDataSetInfo(this.node.toBytes(datasetSlug), {gas: 500000})
      let result = await instance.requestProcessing(this.node.toBytes(datasetSlug), account, {gas: 500000})

      let req = {
        contract_address: this.contracts.datastore.contract.address,
        tx: result.tx,
        account: this.blockchain.node.getDefaultAccount(),
        data: datasetSlug,
        provider: dataset[0],
        processed: false,
        proof: false,
        gasUsed: result.receipt.gasUsed
      }

      let data = await new Request(req).save()
      res.json(data)
    } catch (err) {
      res.status(500).json({error: err.message})
    }
  }

  async read (req, res, id) {
    try {
      let request = await Request.findById(id)
      res.json(request)
    } catch (err) {
      res.status(500).json({error: err.message})
    }
  }
}
