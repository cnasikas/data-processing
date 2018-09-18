const blockchain = require('blockchain')
const {eventHandlers, models} = require('data-market-db')

const PROVIDER = 'http://localhost:7545'

const ledger = blockchain()
let node = null

try {
  node = new ledger.NodeClass(PROVIDER)
} catch (e) {
  console.log(e.message)
  process.exit(1)
}

const eventListener = new ledger.Listener(node.contract)

const registerEvent = async (event) => {
  await eventListener.registerToEvent(event)
}

const main = async () => {
  /*
   NewDataSet
   NewController
   NewProcessor
   NewRequest
   Process
  */

  const events = ['NewProcessor', 'NewController', 'NewDataSet', 'NewRequest']

  for (const e of events) {
    registerEvent(e)
  }

  eventListener.on('NewProcessor', async (req) => {
    req.args.name = node.fromBytes(req.args.name)
    await eventHandlers.handleEntity(models.Processor, req)
  })

  eventListener.on('NewController', async (req) => {
    req.args.name = node.fromBytes(req.args.name)
    await eventHandlers.handleEntity(models.Controller, req)
  })

  eventListener.on('NewDataSet', async (req) => {
    req.args.name = node.fromBytes(req.args.name)
    req.args.hash = req.args.hash.substring(2)
    req.args.category = node.fromBytes(req.args.category)
    req.args.metaHash = node.fromBytes(req.args.metaHash)
    await eventHandlers.handleDataset(req)
  })

  eventListener.on('NewRequest', async (req) => {
    req.args.algorithmID = node.fromBytes(req.args.algorithmID)
    req.args._dataSetID = req.args._dataSetID.substring(2)
    await eventHandlers.handleRequest(req)
  })
}

main()
