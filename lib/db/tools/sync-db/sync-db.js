(async () => {
  const dotenv = require('dotenv')
  const path = require('path')
  const blockchain = require('blockchain')
  const { handleEntity, handleDataset, handleRequest } = require('../../eventHandlers')
  const { Processor, Controller } = require('../../models')

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
  */
  const ledger = blockchain()
  const node = new ledger.NodeClass(PROVIDER)
  await node.init()
  const contract = node.contract

  const processorsEvents = await contract.getPastEvents('NewProcessor', { fromBlock: START_BLOCK, toBlock: END_BLOCK })

  for (let event of processorsEvents) {
    event.args.name = node.fromBytes(event.args.name)
    await handleEntity(Processor, event)
  }

  const controllerEvents = await contract.getPastEvents('NewController', { fromBlock: START_BLOCK, toBlock: END_BLOCK })

  for (let event of controllerEvents) {
    event.args.name = node.fromBytes(event.args.name)
    await handleEntity(Controller, event)
  }

  const dataSetEvents = await contract.getPastEvents('NewDataSet', { fromBlock: START_BLOCK, toBlock: END_BLOCK })

  for (let event of dataSetEvents) {
    event.args.name = node.fromBytes(event.args.name)
    event.args.hash = event.args.hash.substring(2)
    event.args.category = node.fromBytes(event.args.category)
    await handleDataset(event)
  }

  const requestEvents = await contract.getPastEvents('NewRequest', { fromBlock: START_BLOCK, toBlock: END_BLOCK })

  for (let event of requestEvents) {
    event.args.algorithmID = node.fromBytes(event.args.algorithmID)
    event.args._dataSetID = event.args._dataSetID.substring(2)
    await handleRequest(event)
  }

  console.log('[*] Database synced!')
  process.exit()
})().catch((err) => { console.log(err) })
