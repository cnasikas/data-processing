import BaseController from './BaseController'
import Contract from '../db/models/Contract'

export default class ContractController extends BaseController {
  constructor (blockchain) {
    super(Contract, '_id', blockchain)
  }

  list (req, res) {
    let types = []

    let contracts = new this.blockchain.ContractService().getContracts()

    for (let key of Object.keys(contracts)) {
      let temp = {id: contracts[key].id, title: contracts[key].title, desc: contracts[key].desc}
      types.push(temp)
    }

    res.json({types: types})
  }
}
