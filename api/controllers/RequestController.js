import BaseController from './BaseController'
import blockchain from 'blockchain'
import Request from '../db/models/Request'

export default class RequestController extends BaseController {
  constructor () {
    super(Request, '_id')
    this.blockchain = blockchain()
    this.contracts = new this.blockchain.ContractService().getContracts()
  }

  list (req, res) {
    return Request.find().limit(10).sort({created_at: 'desc'})
    .then((response) => {
      res.json(response)
    })
    .catch((err) => {
      res.status(500).json({error: err.message})
    })
  }

  create (req, res) {
    let dataAddr = req.body.data_addr || ''

    this.contracts.request.contract.deployed().then((instance) => {
      return instance.requestForProcess(this.blockchain.node.getDefaultAccount(), dataAddr)
    })
    .then((result) => {
      let req = {
        contract_address: this.contracts.request.contract.address,
        tx: result.tx,
        account: this.blockchain.node.getDefaultAccount(),
        data: dataAddr,
        processed: false,
        proof: false,
        gasUsed: result.receipt.gasUsed
      }

      return new Request(req)
      .save()
      .then((data) => {
        res.json(data)
      })
    })
    .catch((err) => {
      res.status(500).json({error: err.message})
    })
  }

  read (req, res, id) {
    Request.findById(id)
    .then((request) => {
      res.json(request)
    })
    .catch((err) => {
      res.status(500).json({error: err.message})
    })
  }
}
