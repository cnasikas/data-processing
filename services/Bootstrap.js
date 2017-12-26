import morgan from 'morgan'
import bodyParser from 'body-parser'
import cors from 'cors'
import _ from 'lodash'
import dotenv from 'dotenv'

import errors from '../errors/errors.js'
import nodeMiddleware from '../middlewares/NodeMiddleware.js'
import controllers from '../controllers/controllers.js'
import config from '../config.json'
import node from './Node.js'

function setENV () {
  dotenv.config()
}

function validateENV () {
  if (_.isEmpty(process.env.SYM_KEY) || _.isEmpty(process.env.HMAC_KEY)) {
    throw errors.crypto.keysNoEnvSet
  }
}

function initNode () {
  return new Promise((resolve, reject) => {
    node.setProvider()
    node.setDefaultAccount()
    .then((value) => { resolve(value) })
    .catch((err) => { reject(err) })
  })
}

function setMiddlewares (app, db) {
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
  app.use(db.middleware())

  app.use('/api', controllers({config, db}))
}

function setDB (db) {
  /* DB init returns a promise */

  return db.init()
}

/* TODO: Bootstrap with promises .
* All promises should be resolved for successfully bootstrap
*/

export default ({app, db}) => {
  setENV()
  validateENV()
  setDB(db)
  setMiddlewares(app, db)
}
