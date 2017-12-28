import BaseController from './BaseController'
import Data from '../db/models/Data'
import contracts from '../services/Contracts.js'
import node from '../services/Node.js'

export default class DataController extends BaseController {
  constructor () {
    super(Data, '_id')
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

    let hashPointer = req.body.hash_pointer || ''
    contracts.datastore.contract.setProvider(node.getProvider())
    contracts.datastore.contract.deployed().then((instance) => {
      return instance.publishData(node.getDefaultAccount(), hashPointer)
    })
    .then((result) => {
      let o = {
        hash_ptr: hashPointer,
        contract_address: contracts.datastore.contract.address,
        tx: result.tx,
        enc: ''
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

  read (req, res, address) {
    address = address || -1

    contracts.datastore.contract.deployed().then((instance) => {
      return instance.getData.call(address)
    })
    .then((data) => {
      res.json({data: data})
    })
    .catch((err) => {
      res.status(500).json({error: err.message})
    })
  }
}
