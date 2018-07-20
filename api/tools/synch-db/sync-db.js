(async () => {
  const blockchain = require('blockchain')
  const {handleEntity} = require('./handlers')
  const {Processor, Controller} = require('../../models')

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

  instance.NewProcessor({}, {fromBlock: START_BLOCK, toBlock: END_BLOCK}).get(async (err, res) => {
    if (!err) {
      for (let event of res) {
        event.args.name = node.fromBytes(event.args.name)
        await handleEntity(Processor, event)
      }
    }
  })

  instance.NewController({}, {fromBlock: START_BLOCK, toBlock: END_BLOCK}).get(async (err, res) => {
    if (!err) {
      for (let event of res) {
        event.args.name = node.fromBytes(event.args.name)
        await handleEntity(Controller, event)
      }
    }
  })

  // instance.NewDataSet({}, {fromBlock: START_BLOCK, toBlock: END_BLOCK}).get(async (err, res) => {
  //   if (!err) {
  //     for (let datasetEvent of res) {
  //       console.log(datasetEvent.args)
  //       console.log('hash:' + node.fromBytes(datasetEvent.args.hash))
  //       console.log('name:' + node.fromBytes(datasetEvent.args.name))
  //       console.log('location:' + node.fromBytes(datasetEvent.args.location))
  //       console.log('category:' + node.fromBytes(datasetEvent.args.category))
  //       console.log('metaHash:' + node.fromBytes(datasetEvent.args.metaHash))
  //       await handleDataset(datasetEvent)
  //     }
  //   }
  // })
})()
