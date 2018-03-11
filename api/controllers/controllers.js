import { Router } from 'express'

import DataStoreController from './DataStoreController'
import AccountController from './AccountController'
import ContractController from './ContractController'
import RequestController from './RequestController'
import ProcessorController from './ProcessorController'

export default (config, db, blockchain) => {
  const router = Router()
  /* Routes */
  router.use('/contracts', new ContractController(blockchain).router())
  router.use('/datastore', new DataStoreController(blockchain).router())
  router.use('/accounts', new AccountController(blockchain).router())
  router.use('/requests', new RequestController(blockchain).router())
  router.use('/processors', new ProcessorController(blockchain).router())

  router.get('/', (req, res) => {
    res.json({msg: 'Hello World!'})
  })

  return router
}
