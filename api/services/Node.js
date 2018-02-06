import config from '../config.json'
import truffle from '../truffle.js'

function createNode () {
  const backends = {
    'ethereum': 'EthereumNode',
    'cardano': 'CardanoNode'
  }

  const nodePath = backends[config.backend]
  const NodeClass = require('../backends/' + nodePath).default
  const providerURL = 'http://' + truffle.networks.development.host + ':' + truffle.networks.development.port

  return new NodeClass(providerURL)
}

export default createNode()
