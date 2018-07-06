const Listener = require('./Listener.js')

const backends = {
  'ethereum': 'EthereumNode',
  'cardano': 'CardanoNode'
}

module.exports = (backend = 'ethereum') => {
  const nodePath = backends[backend]
  const NodeClass = require('./backends/' + nodePath)

  const blockchain = {
    NodeClass,
    Listener
  }

  return blockchain
}
