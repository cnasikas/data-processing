const Listener = require('./Listener.js')
const DataStore = require('./contracts/build/contracts/DataStore.json')

const backends = {
  'ethereum': 'EthereumNode',
  'cardano': 'CardanoNode'
}

module.exports = (backend = 'ethereum') => {
  const nodePath = backends[backend]
  const NodeClass = require('./backends/' + nodePath)

  const blockchain = {
    NodeClass,
    Listener,
    DataStore
  }

  return blockchain
}
