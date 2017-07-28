import { Router } from 'express'
import contracts from '../services/Contracts.js'
import node from '../services/Node.js'

export default ({config}) => {
    
    let router = Router();

	/* Contract Routes */

	router.get('/', (req, res) => {

		//let response = Object.assign({}, ...Object.keys(contracts).map(k => ({ [k]:  })));

		//const {contract, ...result } = contracts;

  		res.json({contracts: contracts})

	}).post('/', (req, res) => {

		let bytecode = contracts.metadata.unlinked_binary;
		let gasEstimate = node.getLibInstance().eth.estimateGas({data: bytecode}) + 20000

		contracts.metadata.new('message!', {gas: gasEstimate}).then((instance) => {
			res.json({msg: 'new contract succesfully created'})
		})
		.catch(function(err) {
  			res.json({error: err.message})
		})
	})

	return router

}