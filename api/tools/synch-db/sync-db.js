(async () => {
  const blockchain = require('blockchain')
  const {handleDataset} = require('./handlers/dataset')

  const START_BLOCK = 1
  const END_BLOCK = 'latest'
  const PROVIDER = 'http://localhost:7545'
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

  instance.NewDataSet({}, {fromBlock: START_BLOCK, toBlock: END_BLOCK}).get(async (err, res) => {
    if (!err) {
      for (let datasetEvent of res) {
        handleDataset(datasetEvent)
      }
    }
  })
})()
