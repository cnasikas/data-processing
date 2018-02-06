import contract from 'truffle-contract'
import DataStoreArtifact from '../build/contracts/DataStore.json'
import RequestsArtifact from '../build/contracts/Requests.json'
import node from './Node.js'

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

export default class ContractService {
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
