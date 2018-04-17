import BaseController from './BaseController'

export default class ContractController extends BaseController {
  constructor () {
    super('Contract', '_id')
  }

  list (req, res) {
    let types = []

    let contracts = req.app.blockchain.contracts

    for (let key of Object.keys(contracts)) {
      let temp = {id: contracts[key].id, title: contracts[key].title, desc: contracts[key].desc}
      types.push(temp)
    }

    res.json({types: types})
  }
}
