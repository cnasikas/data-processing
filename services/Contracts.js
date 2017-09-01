import contract from 'truffle-contract'
import DataStoreArtifact from '../build/contracts/DataStore.json'
import RequestsArtifact from '../build/contracts/Requests.json'
import node from '../services/Node.js'

let contracts = {
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

for (let key of Object.keys(contracts)) {
  contracts[key].contract.setProvider(node.getProvider())
}

export default contracts
