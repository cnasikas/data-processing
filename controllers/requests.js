import { Router } from 'express'

import contracts from '../services/Contracts.js'
import node from '../services/Node.js'

export default ({config, db}) => {
  let router = Router()

  /* Contract Routes */

  router.get('/', (req, res) => {
    // let requests = db.get('contracts').get('requests').filter({user_addr: node.getDefaultAccount()})
    res.json({requests: []})
  })
  .post('/', (req, res) => {
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
  })
  .get('/:address', (req, res) => {
    let address = req.params.address || -1

    contracts.request.contract.deployed().then((instance) => {
      return instance.getRequestDataAddr.call(address)
    })
    .then((data) => {
      res.json({data: data})
    })
    .catch((err) => {
      res.status(500).json({error: err.message})
    })
  })

  return router
}
