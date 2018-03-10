const contract = require('truffle-contract')
const DataStoreArtifact = require('./build/contracts/DataStore.json')
const RequestsArtifact = require('./build/contracts/Requests.json')
const EvaluationArtifact = require('./build/contracts/Evaluation.json')
const DataDumpArtifact = require('./build/contracts/DataDump.json')

const contracts = {
  datastore: {
    id: 'datastore',
    title: 'Data Store',
    desc: 'A data store contract.',
    contract: contract(DataStoreArtifact),
    hidden: false
  },
  request: {
    id: 'requests',
    title: 'Requests',
    desc: 'A data processing request contract',
    contract: contract(RequestsArtifact),
    hidden: false
  },
  evaluation: {
    contract: contract(EvaluationArtifact),
    hidden: true
  },
  dataDump: {
    contract: contract(DataDumpArtifact),
    hidden: true
  }
}

module.exports = class ContractService {
  constructor (provider) {
    this.contracts = contracts
    this.provider = provider
  }

  initContracts () {
    for (let key of Object.keys(contracts)) {
      contracts[key].contract.setProvider(this.provider)
    }

    return this
  }

  getContracts (withHidden = false) {
    return Object.keys(this.contracts)
    .filter(key => this.contracts[key].hidden === withHidden)
    .reduce((obj, key) => {
      obj[key] = this.contracts[key]
      return obj
    }, {})
  }
}
