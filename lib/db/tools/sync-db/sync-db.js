(async () => {
  const dotenv = require('dotenv')
  const path = require('path')
  const blockchain = require('blockchain')
  const {
    handleProcessor,
    handleController,
    handleDataset,
    handleRequest,
    handleProcess,
    handleProof
  } = require('../../eventHandlers')

  dotenv.config({ path: path.join(__dirname, '../../.env') })

  const START_BLOCK = 1
  const END_BLOCK = 'latest'
  const PROVIDER = process.env.PROVIDER || 'http://localhost:7545'

  console.log('[*] Syncing database...')
  /*
   NewDataSet
   NewController
   NewProcessor
   NewRequest
   Process
   NewProof
  */
  const ledger = blockchain()
  const node = new ledger.NodeClass(PROVIDER)
  await node.init()
  const dataStore = node.getDataStore()
  const proofStore = node.getProofStore()

  const filterOptions = { fromBlock: START_BLOCK, toBlock: END_BLOCK }

  const loopEvents = async (events, handler) => {
    for (let event of events) {
      await handler(event)
    }
  }

  const promisifyFilter = (filter) => {
    return new Promise((resolve, reject) => {
      filter.get((err, res) => {
        if (err) { reject(err) }
        resolve(res)
      })
    })
  }

  const events = [
    { contract: dataStore, event: 'NewProcessor', handler: handleProcessor },
    { contract: dataStore, event: 'NewController', handler: handleController },
    { contract: dataStore, event: 'NewDataSet', handler: handleDataset },
    { contract: dataStore, event: 'NewRequest', handler: handleRequest },
    { contract: dataStore, event: 'Process', handler: handleProcess },
    { contract: proofStore, event: 'NewProof', handler: handleProof }
  ]

  const promises = events.map(e => {
    return async () => {
      const events = await promisifyFilter(e.contract[e.event]({}, { ...filterOptions }))
      await loopEvents(events, e.handler)
    }
  })

  const allEventPromises = promises.reduce((p, fn) => p.then(fn), Promise.resolve())

  allEventPromises
    .then(res => {
      console.log('[*] Database synced!')
      process.exit()
    })
    .catch(err => {
      console.log(err)
      process.exit(1)
    })
})()
