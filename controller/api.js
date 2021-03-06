import path from 'path'
import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import sanitizer from 'express-sanitizer'
import cors from 'cors'
import logSymbols from 'log-symbols'
import dsm from 'dataset-manager'

const PORT = process.env.PORT || 3003
const DATASET_FOLDER = process.env.DATASET_FOLDER || 'datasets'

const app = express()
const router = express.Router()
const datasetManager = dsm('http', path.join(__dirname, DATASET_FOLDER))

const download = async (req, res, id) => {
  try {
    await datasetManager.datasetExists(id)
  } catch (e) {
    console.log(e)
    return res.status(404).json({ success: false, msg: 'Dataset not found' })
  }

  const options = {
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  }

  return res.download(datasetManager.getEncPath(id), `${id}.${datasetManager.fm.fileExt['enc']}`, options)
}

const errorHandler = (err, req, res, next) => {
  res.status(500).send({ error: err.message })
  return next(err)
}

const setRoutes = () => {
  router.get('/health', (_, res) => res.status(204).json({}))

  router.get(
    '/datastore/:id',
    (req, res, next) => { download(req, res, req.params.id).catch(next) }
  )

  router.use((req, res) => {
    res.status(404).json({ error: 'Not Found' })
  })
}

export default () => {
  app.use(morgan('dev'))
  app.use(cors({
    exposedHeaders: ['Link']
  }))

  app.use(bodyParser.json({
    limit: '100kb',
    extended: false
  }))

  app.disable('x-powered-by')
  app.use(sanitizer())
  app.use(helmet())

  setRoutes()

  app.use(router)

  app.use(errorHandler)

  app.listen(PORT, function () {
    console.log(logSymbols.info, `API: Started on port ${this.address().port}`)
  })
}
