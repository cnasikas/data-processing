const dotenv = require('dotenv')
const path = require('path')
const blockchain = require('blockchain')
const { eventHandlers, models } = require('data-market-db')

dotenv.config({ path: path.join(__dirname, '.env') })

const PROVIDER = process.env.PROVIDER || 'http://localhost:7545'

const registerEvents = (contract, key, handler) => {
  console.log(`[*] Starting ${key} listener`)

  contract[key]()
    .on('data', event => handler(event))
    .on('error', console.error)
}

const listenToEvents = async (node) => {
  /*
   NewDataSet
   NewController
   NewProcessor
   NewRequest
   Process
  */
  const NewProcessorHandler = async (req) => {
    req.args.name = node.fromBytes(req.args.name)
    await eventHandlers.handleEntity(models.Processor, req)
  }

  const NewControllerHandler = async (req) => {
    req.args.name = node.fromBytes(req.args.name)
    await eventHandlers.handleEntity(models.Controller, req)
  }

  const NewDataSetHandler = async (req) => {
    req.args.name = node.fromBytes(req.args.name)
    req.args.hash = req.args.hash.substring(2)
    req.args.category = node.fromBytes(req.args.category)
    await eventHandlers.handleDataset(req)
  }

  const NewRequestHandler = async (req) => {
    req.args.algorithmID = node.fromBytes(req.args.algorithmID)
    req.args._dataSetID = req.args._dataSetID.substring(2)
    await eventHandlers.handleRequest(req)
  }

  const events = {
    NewProcessor: NewProcessorHandler,
    NewController: NewControllerHandler,
    NewDataSet: NewDataSetHandler,
    NewRequest: NewRequestHandler
  }

  for (const key in events) {
    registerEvents(node.contract, key, events[key])
  }
}

const main = async () => {
  const ledger = blockchain()
  const node = new ledger.NodeClass(PROVIDER)

  try {
    await node.init()
    await listenToEvents(node)
  } catch (e) {
    console.log(e.message)
    process.exit(1)
  }
}

main()
