import BaseController from './BaseController'
import node from '../services/Node.js'
import ContractService from '../services/Contracts.js'
import Request from '../db/models/Request'

export default class RequestController extends BaseController {
  constructor () {
    super(Request, '_id')
    this.contracts = new ContractService().getContracts()
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
      return instance.requestForProcess(node.getDefaultAccount(), dataAddr)
    })
    .then((result) => {
      let req = {
        contract_address: this.contracts.request.contract.address,
        tx: result.tx,
        account: node.getDefaultAccount(),
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
