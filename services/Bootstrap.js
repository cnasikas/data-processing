
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cors from 'cors'
import low from 'lowdb'
import _ from 'lodash'
import dotenv from 'dotenv'

import nodeMiddleware from '../middlewares/NodeMiddleware.js'
import controllers from '../controllers/controllers.js'
import config from '../config.json'

function setENV () {
  dotenv.config()
}

function validateENV () {
  if (_.isEmpty(process.env.SYM_KEY) || _.isEmpty(process.env.HMAC_KEY)) {
    throw new Error('Please set your symmetric and hmac key.')
  }
}

function setMiddlewares (app) {
  // logger
  app.use(morgan('dev'))

  // 3rd party middleware
  app.use(cors({
    exposedHeaders: config.corsHeaders
  }))

  app.use(bodyParser.json({
    limit: config.bodyLimit
  }))

  app.use(nodeMiddleware())

  app.use('/api', controllers({config}))
}

function db () {
  /* Write returns a promise. Fix it. */
  /* Start server listen afterd db init and hanlde errors */

  let contracts = low('./db/contracts.js')

  if (_.isEmpty(contracts.getState())) {
    contracts.defaults({ contracts: {datastore: [], requests: []}, user: {} }).write()
  }
}

/* TODO: Bootstrap with promises .
* All promises should be resolved for successfully bootstrap
*/

export default ({app}) => {
  setENV()
  validateENV()
  db()
  setMiddlewares(app)
}
