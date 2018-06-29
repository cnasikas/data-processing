import BaseController from './BaseController'
import {Processor} from '../models'

export default class ProcessorController extends BaseController {
  constructor () {
    super(Processor, 'processor', 'processors')
  }

  async create (req, res) {
    const processor = req.body

    try {
      await Processor.create({
        name: processor.name,
        pub_key: processor.pubkey,
        address_id: 1,
        tx_id: processor.txId,
        status: 'pending'
      })

      res.status(200).json({})
      return res.json()
    } catch (err) {
      console.log(err)
      res.status(500).json({error: 'Failed saving pending bid'})
    }
  }
}
