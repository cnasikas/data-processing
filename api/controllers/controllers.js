import { Router } from 'express'

import DataStoreController from './DataStoreController'
import AccountController from './AccountController'
import ContractController from './ContractController'
import RequestController from './RequestController'
import ProcessorController from './ProcessorController'

export default () => {
  const router = Router()
  /* Routes */
  router.use('/contracts', new ContractController().router())
  router.use('/datastore', new DataStoreController().router())
  router.use('/accounts', new AccountController().router())
  router.use('/requests', new RequestController().router())
  router.use('/processors', new ProcessorController().router())

  router.get('/', (req, res) => {
    res.json({msg: 'Hello World!'})
  })

  return router
}
