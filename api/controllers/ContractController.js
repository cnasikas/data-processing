import BaseController from './BaseController'
import Contract from '../db/models/Contract'
import blockchain from 'blockchain'

export default class ContractController extends BaseController {
  constructor () {
    super(Contract, '_id')
    this.blockchain = blockchain()
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
