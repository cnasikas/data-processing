(async () => {
  const dotenv = require('dotenv')
  const path = require('path')
  const blockchain = require('blockchain')
  const { handleEntity, handleDataset, handleRequest, handleProof } = require('../../eventHandlers')

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

  dataStore.NewProcessor({}, { fromBlock: START_BLOCK, toBlock: END_BLOCK }).get(async (err, res) => {
    if (!err) {
      for (let event of res) {
        await handleEntity('Processor', event)
      }

      dataStore.NewController({}, { fromBlock: START_BLOCK, toBlock: END_BLOCK }).get(async (err, res) => {
        if (!err) {
          for (let event of res) {
            await handleEntity('Controller', event)
          }
        }

        dataStore.NewDataSet({}, { fromBlock: START_BLOCK, toBlock: END_BLOCK }).get(async (err, res) => {
          if (!err) {
            for (let event of res) {
              await handleDataset(event)
            }
          }

          dataStore.NewRequest({}, { fromBlock: START_BLOCK, toBlock: END_BLOCK }).get(async (err, res) => {
            if (!err) {
              for (let event of res) {
                await handleRequest(event)
              }

              proofStore.NewProof({}, { fromBlock: START_BLOCK, toBlock: END_BLOCK }).get(async (err, res) => {
                if (!err) {
                  for (let event of res) {
                    await handleProof(event)
                  }

                  console.log('[*] Database synced!')
                  process.exit()
                }
              })
            }
          })
        })
      })
    }
  })
})()
