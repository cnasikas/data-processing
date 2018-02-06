import morgan from 'morgan'
import bodyParser from 'body-parser'
import cors from 'cors'
import _ from 'lodash'
import dotenv from 'dotenv'
import {node, ContractService} from 'blockchain'

import errors from '../errors/errors.js'
import nodeMiddleware from '../middlewares/NodeMiddleware.js'
import controllers from '../controllers/controllers.js'
import config from '../config.json'

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
    if (!node.isConnected()) {
      reject(errors.node.connection)
    }
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

export default ({app, db}) => {
  setENV()
  validateENV()

  return new Promise((resolve, reject) => {
    initNode()
    .then((value) => {
      new ContractService().initContracts()
      return setDB(db)
    })
    .then((value) => {
      setMiddlewares(app, db)
      resolve(value)
    })
    .catch((err) => { reject(err) })
  })
}
