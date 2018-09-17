import BaseController from './BaseController'
import Datastore from '../../blockchain/build/contracts/Datastore.json'

export default class ContractController extends BaseController {
  constructor () {
    super('Contract', '_id')
  }

  async list (req, res) {
    res.json({datastore: Datastore})
  }
}
