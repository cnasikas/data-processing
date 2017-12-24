import BaseController from './BaseController'
import node from '../services/Node.js'
import contracts from '../services/Contracts.js'
import Request from '../db/models/Request'

export default class RequestController extends BaseController {
  constructor () {
    super(Request, '_id')
  }

  list (req, res) {
    // let requests = db.get('contracts').get('requests').filter({user_addr: node.getDefaultAccount()})
    res.json({requests: []})
  }

  create (req, res) {
    let dataAddr = req.body.data_addr || ''

    contracts.request.contract.deployed().then((instance) => {
      return instance.requestForProcess(node.getDefaultAccount(), dataAddr)
    })
    .then((result) => {
      let response = {
        contract_address: contracts.request.contract.address,
        tx: result.tx,
        user_addr: node.getDefaultAccount(),
        timestamp: Date.now(),
        data: {
          data_addr: dataAddr,
          processed: false,
          proof: false
        }
      }
      // db.get('contracts').get('requests').push(response).write()
      res.json(response)
    })
    .catch((err) => {
      res.status(500).json({error: err.message})
    })
  }
}
