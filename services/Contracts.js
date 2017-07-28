import contract from 'truffle-contract'
import MetaDataArtifact from '../build/contracts/MetaData.json'
import node from '../services/Node.js'

let contracts = [
	{	
		id: 'metadata',
		title: 'MetaData',
		desc: 'In this type of contract you can put an encrypted hash pointer (metadata) pointing to the data',
		contract: contract(MetaDataArtifact)
	},
	{	
		id: 'request',
		title: 'Request',
		desc: 'In this type of contract you can request for a computation over some data',
		contract: contract(MetaDataArtifact)
	}
]

for (let contract of contracts){
	contract.contract.setProvider(node.getProvider())
}

export default contracts