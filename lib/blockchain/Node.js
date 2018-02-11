const truffle = require('./truffle.js')

function createNode (backend = 'ethereum') {
  const backends = {
    'ethereum': 'EthereumNode',
    'cardano': 'CardanoNode'
  }

  const nodePath = backends[backend]
  const NodeClass = require('./backends/' + nodePath)
  const providerURL = 'http://' + truffle.networks.development.host + ':' + truffle.networks.development.port

  return new NodeClass(providerURL)
}

module.exports = createNode()
