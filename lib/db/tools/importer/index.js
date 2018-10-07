(async () => {
  const dotenv = require('dotenv')
  const path = require('path')
  const blockchain = require('blockchain')
  const { importDataSets } = require('./datasets')
  const { importRequests } = require('./requests')
  const { importEntities } = require('./entities')

  dotenv.config({ path: path.join(__dirname, '../../.env') })

  const PROVIDER = process.env.PROVIDER || 'http://localhost:7545'

  const ledger = blockchain()
  const node = new ledger.NodeClass(PROVIDER)

  try {
    await node.init()
    await importEntities(node)
    await importDataSets(node)
    await importRequests(node)
  } catch (e) {
    console.log(e)
  }

  process.exit()
})()
