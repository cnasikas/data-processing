import _ from './env' // eslint-disable-line no-unused-vars
import { handleProcess } from './actions'
import blockchain from 'blockchain'
import dsm from 'dataset-manager'
import path from 'path'

const PROVIDER = process.env.PROVIDER || 'http://localhost:7545'
const DATASET_FOLDER = process.env.DATASET_FOLDER || 'datasets'

const datasetManager = dsm('http', path.join(__dirname, DATASET_FOLDER))

const register = async (node, eventListener) => {
  await eventListener.registerToEvent('Process')

  eventListener.on('Process', (req) => {
    handleProcess(node, req.args).catch((err) => { eventListener.emit('error', err) })
  })

  eventListener.on('error', console.error)
}

const main = async () => {
  const ledger = blockchain()
  const node = new ledger.NodeClass(PROVIDER)

  console.log('[*] Processor node started')
  await node.init()
  await datasetManager.initStructure()
  const eventListener = new ledger.Listener(node.getDataStore())

  register(node, eventListener)
    .catch((err) => { console.log(err) })
}

main().catch((err) => {
  console.log(err.message)
  process.exit(1)
})
