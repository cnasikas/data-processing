import config from '../config.json';

function createNode() {

	const backends = {
		'ethereum': 'EthereumNode',
		'cardano': 'CardanoNode'
	};

	const nodePath = backends[config.backend];
	const NodeClass = require('../backends/' + nodePath).default;


	return new NodeClass();
}

export default createNode();