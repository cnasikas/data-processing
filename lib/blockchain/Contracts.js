const contract = require('truffle-contract')
const DataStoreArtifact = require('./build/contracts/DataStore.json')
const RequestsArtifact = require('./build/contracts/Requests.json')
const node = require('./Node.js')

const contracts = {
  datastore: {
    id: 'datastore',
    title: 'Data Store',
    desc: 'A data store contract.',
    contract: contract(DataStoreArtifact)
  },
  request: {
    id: 'requests',
    title: 'Requests',
    desc: 'A data processing request contract',
    contract: contract(RequestsArtifact)
  }
}

module.exports = class ContractService {
  constructor () {
    this.contracts = contracts
  }

  initContracts () {
    let provider = node.getProvider()

    for (let key of Object.keys(contracts)) {
      contracts[key].contract.setProvider(provider)
    }
  }

  getContracts () {
    return this.contracts
  }
}
