import morgan from 'morgan'
import bodyParser from 'body-parser'
import cors from 'cors'
import _ from 'lodash'
import dotenv from 'dotenv'
import blockchain from 'blockchain'

import errors from '../errors/errors.js'
import middlewares from '../middlewares/middlewares.js'
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

function initNode (bl) {
  return new Promise((resolve, reject) => {
    bl.node.setProvider()
    if (!bl.node.isConnected()) {
      reject(errors.node.connection)
    }
    bl.node.setDefaultAccount()
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

  app.use(middlewares.node())
  app.use(middlewares.db())

  app.use('/api', controllers({config, db}))
}

function setDB (db) {
  /* DB init returns a promise */

  return db.init()
}

export default ({app, db}) => {
  setENV()
  validateENV()
  const bl = blockchain()

  return new Promise((resolve, reject) => {
    initNode(bl)
    .then((value) => {
      new bl.ContractService().initContracts()
      return setDB(db)
    })
    .then((value) => {
      setMiddlewares(app, db)
      resolve(value)
    })
    .catch((err) => { reject(err) })
  })
}
