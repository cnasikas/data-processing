import contract from 'truffle-contract'
import MetaDataArtifact from '../build/contracts/MetaData.json'
import node from '../services/Node.js'

let contracts = {
	metadata: {	
		id: 'metadata',
		title: 'MetaData',
		desc: 'In this type of contract you can put an encrypted hash pointer (metadata) pointing to the data',
		contract: contract(MetaDataArtifact)
	},
	request: {	
		id: 'request',
		title: 'Request',
		desc: 'In this type of contract you can request for a computation over some data',
		contract: contract(MetaDataArtifact)
	}
}

for (let key of Object.keys(contracts)) {
    contracts[key].contract.setProvider(node.getProvider())
}

export default contracts