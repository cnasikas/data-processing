import BaseController from './BaseController'
import Contract from '../db/models/Contract'
import ContractService from '../services/Contracts.js'

export default class ContractController extends BaseController {
  constructor () {
    super(Contract, '_id')
  }

  list (req, res) {
    let types = []

    let contracts = new ContractService().getContracts()

    for (let key of Object.keys(contracts)) {
      let temp = {id: contracts[key].id, title: contracts[key].title, desc: contracts[key].desc}
      types.push(temp)
    }

    res.json({types: types})
  }
}
