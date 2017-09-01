import { Router } from 'express'
import contracts from './contracts'
import datastore from './datastore'
import account from './account'
import requests from './requests'

export default ({config}) => {
  const router = Router()

  /* Routes */

  router.use('/contracts', contracts({config}))
  router.use('/datastore', datastore({config}))
  router.use('/account', account({config}))
  router.use('/requests', requests({config}))

  router.get('/', (req, res) => {
    res.json({msg: 'Hello World!'})
  })

  return router
}
