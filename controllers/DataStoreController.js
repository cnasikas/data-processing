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
    let ciphertext = 'ciphertex' // JSON.parse(ecc.encrypt(hashPointer))

    let strignify = Object.keys(ciphertext).map(function (k) { return ciphertext[k] }).join(':')

    contracts.datastore.contract.deployed().then((instance) => {
      return instance.publishData(node.getDefaultAccount(), strignify)
    })
    .then((result) => {
      let response = {
        contract_address: contracts.datastore.contract.address,
        tx: result.tx,
        user_addr: node.getDefaultAccount(),
        timestamp: Date.now(),
        data: {
          ciphertext
        }
      }

      /*
      let data = db.get('contracts').get('datastore')

      if (_.isEmpty(data.value())) {
        data.push(response).write()
      } else {
        data.first().assign(response).write()
      }
      */
      res.json(response)
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
