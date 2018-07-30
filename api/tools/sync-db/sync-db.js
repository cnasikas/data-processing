(async () => {
  const blockchain = require('blockchain')
  const {handleEntity, handleDataset} = require('../../utils/eventHandlers')
  const {Processor, Controller} = require('../../models')

  const START_BLOCK = 1
  const END_BLOCK = 'latest'
  const PROVIDER = 'http://localhost:7545'

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
  const contract = node.contractInstance
  const instance = await contract.deployed()

  instance.NewProcessor({}, {fromBlock: START_BLOCK, toBlock: END_BLOCK}).get(async (err, res) => {
    if (!err) {
      for (let event of res) {
        event.args.name = node.fromBytes(event.args.name)
        await handleEntity(Processor, event)
      }

      instance.NewController({}, {fromBlock: START_BLOCK, toBlock: END_BLOCK}).get(async (err, res) => {
        if (!err) {
          for (let event of res) {
            event.args.name = node.fromBytes(event.args.name)
            await handleEntity(Controller, event)
          }
        }

        instance.NewDataSet({}, {fromBlock: START_BLOCK, toBlock: END_BLOCK}).get(async (err, res) => {
          if (!err) {
            for (let event of res) {
              event.args.name = node.fromBytes(event.args.name)
              event.args.category = node.fromBytes(event.args.category)
              event.args.metaHash = node.fromBytes(event.args.metaHash)
              await handleDataset(event)
            }
          }

          instance.NewRequest({}, {fromBlock: START_BLOCK, toBlock: END_BLOCK}).get(async (err, res) => {
            if (!err) {
              for (let event of res) {
                event.args.name = node.fromBytes(event.args.name)
                event.args.category = node.fromBytes(event.args.category)
                event.args.metaHash = node.fromBytes(event.args.metaHash)
                await handleDataset(event)
              }

              console.log('[*] Database synced!')
              process.exit()
            }
          })
        })
      })
    }
  })
})()
