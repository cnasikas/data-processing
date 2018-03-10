const ContractService = require('./Contracts.js')
const Listener = require('./Listener.js')
const truffle = require('./truffle.js')

const backends = {
  'ethereum': 'EthereumNode',
  'cardano': 'CardanoNode'
}

module.exports = async (backend = 'ethereum') => {
  const nodePath = backends[backend]
  const NodeClass = require('./backends/' + nodePath)
  const providerURL = 'http://' + truffle.networks.development.host + ':' + truffle.networks.development.port

  const node = new NodeClass(providerURL)
  node.setProvider()

  if (!node.isConnected()) {
    throw new Error('Blockchain node conncection error')
  }

  await node.setDefaultAccount()
  const contractService = new ContractService(node.getProvider())
  contractService.initContracts()
  const contracts = contractService.getContracts()
  const listener = new Listener(node, contracts)

  const blockchain = {
    node,
    contracts,
    listener
  }

  return blockchain
}
