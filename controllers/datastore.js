import { Router } from 'express'

import contracts from '../services/Contracts.js'
import node from '../services/Node.js'

export default ({config}) => {
  let router = Router()

  /* Contract Routes */

  router.get('/', (req, res) => {
    let address = node.getDefaultAccount()

    contracts.datastore.contract.deployed().then((instance) => {
      return instance.getData.call(address)
    })
    .then((data) => {
      let response = {
        contract_address: contracts.datastore.contract.address,
        user_addr: address,
        data: {
          hash_pointer: data
        }
      }
      res.json({datastore: [response]})
    })
    .catch((err) => {
      res.status(500).json({error: err.message})
    })
  })
  .post('/', (req, res) => {
    /* TODO: Hanlde null values on post */

    let hashPointer = req.body.hash_pointer || ''

    contracts.datastore.contract.deployed().then((instance) => {
      return instance.publishData(node.getDefaultAccount(), hashPointer)
    })
    .then((result) => {
      let response = {
        contract_address: contracts.datastore.contract.address,
        tx: result.tx,
        user_addr: node.getDefaultAccount(),
        timestamp: Date.now(),
        data: {
          hash_pointer: hashPointer
        }
      }
      res.json(response)
    })
    .catch((err) => {
      res.status(500).json({error: err.message})
    })
  })
  .get('/:address', (req, res) => {
    let address = req.params.address || -1

    contracts.datastore.contract.deployed().then((instance) => {
      return instance.getData.call(address)
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
