import { Router } from 'express'

import DataStoreController from './DataStoreController'
import AccountController from './AccountController'
import UserController from './UserController'
import ContractController from './ContractController'
import RequestController from './RequestController'

export default ({config, db}) => {
  const router = Router()
  /* Routes */

  router.use('/contracts', new ContractController().router())
  router.use('/datastore', new DataStoreController().router())
  router.use('/account', new AccountController().router())
  router.use('/user', new UserController().router())
  router.use('/requests', new RequestController().router())

  router.get('/', (req, res) => {
    res.json({msg: 'Hello World!'})
  })

  return router
}
