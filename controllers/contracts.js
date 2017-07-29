import { Router } from 'express'
import artifactor from 'truffle-artifactor'
import low from 'lowdb'

import contracts from '../services/Contracts.js'
import node from '../services/Node.js'

export default ({config}) => {
    
    let router = Router();

    const db = low('./db/contracts.js')

	/* Contract Routes */

	router.get('/', (req, res) => {

		let dbContracts = db.get('contracts').filter({owner: node.getDefaultAccount()}).take(20).value()
  		res.json({contracts: dbContracts})

	})
	.get('/types', (req, res) => {

  		res.json({contracts: contracts})

	}).post('/', (req, res) => {

		let arg = 'enc_value'

		contracts.metadata.contract.new(arg, {gas: 200000})
		.then((instance) => {
			
			db.get('contracts').push({ id: instance.address, owner: node.getDefaultAccount()}).write()
			res.json({id: instance.address})
		})
		.catch( (err) => {
  			res.json({error: err.message})
		})
	})

	return router

}