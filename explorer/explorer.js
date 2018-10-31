const dotenv = require('dotenv')
const path = require('path')
const blockchain = require('blockchain')
const { eventHandlers } = require('data-market-db')

dotenv.config({ path: path.join(__dirname, '.env') })

const PROVIDER = process.env.PROVIDER || 'http://localhost:7545'

const registerEvent = async (eventListener, event) => {
  await eventListener.registerToEvent(event)
}

const listenToEvents = async (node, contracts) => {
  /*
   NewDataSet
   NewController
   NewProcessor
   NewRequest
   Process
   NewProof
  */

  for (const contract of contracts) {
    for (const event of contract.events) {
      registerEvent(contract.listener, event)
    }
  }

  const dataStoreListener = contracts[0].listener
  const proofStoreListener = contracts[1].listener

  dataStoreListener.on('NewProcessor', async (req) => {
    await eventHandlers.handleEntity('Processor', req)
  })

  dataStoreListener.on('NewController', async (req) => {
    await eventHandlers.handleEntity('Controller', req)
  })

  dataStoreListener.on('NewDataSet', async (req) => {
    await eventHandlers.handleDataset(req)
  })

  dataStoreListener.on('NewRequest', async (req) => {
    await eventHandlers.handleRequest(req)
  })

  proofStoreListener.on('NewProof', async (req) => {
    await eventHandlers.handleProof(req)
  })
}

const main = async () => {
  const ledger = blockchain()
  const node = new ledger.NodeClass(PROVIDER)
  const dataStoreEvents = ['NewProcessor', 'NewController', 'NewDataSet', 'NewRequest']
  const proofEvents = ['NewProof']

  try {
    await node.init()
    const dataStoreListener = new ledger.Listener(node.getDataStore())
    const proofListener = new ledger.Listener(node.getProofStore())
    await listenToEvents(node,
      [
        { events: dataStoreEvents, listener: dataStoreListener },
        { events: proofEvents, listener: proofListener }
      ]
    )
  } catch (e) {
    console.log(e.message)
    process.exit(1)
  }
}

main()
