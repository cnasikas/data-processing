import BaseController from './BaseController'
import Data from '../db/models/Data'
import ContractService from '../services/Contracts.js'
import node from '../services/Node.js'

export default class DataController extends BaseController {
  constructor () {
    super(Data, '_id')
    this.contracts = new ContractService().getContracts()
  }

  list (req, res) {
    return Data.find().limit(10)
    .then((data) => {
      res.json({datastore: data})
    })
    .catch((err) => {
      res.status(500).json({error: err.message})
    })
  }

  create (req, res) {
    /* TODO: Hanlde null values on post */
    let account = node.getDefaultAccount()
    let hashPointer = req.body.hash_pointer || ''

    this.contracts.datastore.contract.setProvider(node.getProvider())
    this.contracts.datastore.contract.deployed().then((instance) => {
      return instance.publishData(account, hashPointer)
    })
    .then((result) => {
      let o = {
        hash_ptr: hashPointer,
        contract_address: this.contracts.datastore.contract.address,
        tx: result.tx,
        enc: '',
        account
      }

      return new Data(o)
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
    Data.findById(id)
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      res.status(500).json({error: err.message})
    })
  }
}
