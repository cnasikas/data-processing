import morgan from 'morgan'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import sanitizer from 'express-sanitizer'
import cors from 'cors'
import _ from 'lodash'
import dotenv from 'dotenv'
import blockchain from 'blockchain'

import middlewares from '../middlewares/middlewares.js'
import controllers from '../controllers/controllers.js'
import config from '../config.json'

function validateENV () {
  if (_.isEmpty(process.env.SYM_KEY) || _.isEmpty(process.env.HMAC_KEY)) {
    throw new Error('Please set your symmetric and hmac key')
  }
}

function setMiddlewares (app) {
  app.use(morgan('dev'))
  app.use(cors({
    exposedHeaders: config.corsHeaders
  }))

  app.use(bodyParser.json({
    limit: config.bodyLimit,
    extended: false
  }))

  app.disable('x-powered-by')
  app.use(sanitizer())
  app.use(helmet())
  app.use(middlewares.node(app.blockchain))
  app.use(middlewares.db(app.db))

  app.use('/api', controllers())
}

export default async (app, db) => {
  dotenv.config()
  validateENV()
  const bl = await blockchain()
  await db.init()
  app.blockchain = bl
  app.db = db
  setMiddlewares(app)
}
