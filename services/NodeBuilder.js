import config from '../config.json';

export default () => {

	let backends = {
		'ethereum': 'EthereumNode',
		'cardano': 'CardanoNode'
	};

	let nodePath = backends[config.backend];
	let NodeClass = require('../backends/' + nodePath).default;

	return new NodeClass();
}