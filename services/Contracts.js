import contract from 'truffle-contract'
import DataStoreArtifact from '../build/contracts/DataStore.json'
import RequestArtifact from '../build/contracts/Request.json'
import node from '../services/Node.js'

let contracts = {
	datastore: {	
		id: 'datastore',
		title: 'Data Store',
		desc: 'A data store contract.',
		contract: contract(DataStoreArtifact)
	},
	request: {	
		id: 'request',
		title: 'Request',
		desc: 'A data processing request contract',
		contract: contract(RequestArtifact)
	}
}

for (let key of Object.keys(contracts)) {
    contracts[key].contract.setProvider(node.getProvider())
}

export default contracts