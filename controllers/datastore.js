import { Router } from 'express'
import _ from 'lodash'

import contracts from '../services/Contracts.js'
import node from '../services/Node.js'

export default ({config, db}) => {
  let router = Router()

  /* Contract Routes */

  router.get('/', (req, res) => {
    let address = node.getDefaultAccount()

    contracts.datastore.contract.deployed().then((instance) => {
      return instance.getData.call(address)
    })
    .then((data) => {
      // let defaults = { iv: '', v: 1, iter: 10000, ks: 128, ts: 64, mode: 'ccm', adata: '', cipher: 'aes', ct: '' }
      // let dataArr = data.split(':')

      // let ciphertext = Object.assign(...Object.keys(defaults).map(function (k, index) { return {[k]: dataArr[index]} }))

      let ciphertext = 'cipher'

      let response = {
        contract_address: contracts.datastore.contract.address,
        user_addr: address,
        data: {
          ciphertext
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
    let ciphertext = 'ciphertex' // JSON.parse(ecc.encrypt(hashPointer))

    let strignify = Object.keys(ciphertext).map(function (k) { return ciphertext[k] }).join(':')

    contracts.datastore.contract.deployed().then((instance) => {
      return instance.publishData(node.getDefaultAccount(), strignify)
    })
    .then((result) => {
      let response = {
        contract_address: contracts.datastore.contract.address,
        tx: result.tx,
        user_addr: node.getDefaultAccount(),
        timestamp: Date.now(),
        data: {
          ciphertext
        }
      }

      /*
      let data = db.get('contracts').get('datastore')

      if (_.isEmpty(data.value())) {
        data.push(response).write()
      } else {
        data.first().assign(response).write()
      }
      */
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
