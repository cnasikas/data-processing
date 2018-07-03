import BaseController from './BaseController'
import {Request} from '../models'

export default class RequestController extends BaseController {
  constructor () {
    super(Request, 'request', 'requests')
  }

  async create (req, res) {
    const request = req.body

    try {
      await Request.create({
        dataset_id: 1, // get dataset's ID from db by hash
        address_id: 1,
        tx_id: request.txId,
        algorithm_id: 1, // request.query
        status: 'pending',
        processed: false,
        pub_key: request.pubkey
      })

      res.json({})
    } catch (err) {
      res.status(500).json({error: err.message})
    }
  }

  async read (req, res, id) {
    try {
      res.json({})
    } catch (err) {
      res.status(500).json({error: err.message})
    }
  }
}
