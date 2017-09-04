import { Router } from 'express'

import node from '../services/Node.js'

export default ({config}) => {
  let router = Router()

  /* Routes */

  router.get('/', (req, res) => {
    let account = {
      address: node.getDefaultAccount(),
      balance: node.getBalance(node.getDefaultAccount())
    }

    res.json(account)
  })
  .post('/', (req, res) => {
    let account = req.body.account || false
    if (!account) {
      node.setDefaultAccount() /* Should return a promise */

      let account = {
        address: node.getDefaultAccount(),
        balance: node.getBalance(node.getDefaultAccount())
      }

      res.json(account)
    }
  })

  return router
}
