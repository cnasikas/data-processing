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

		let types = []

		for (let key of Object.keys(contracts)) {
			let temp = {id: contracts[key].id, title: contracts[key].title, desc: contracts[key].desc}
		    types.push(temp)
		}

  		res.json({types: types})

	}).post('/', (req, res) => {

		let hash_pointer = req.body.hash_pointer

		contracts.metadata.contract.new(hash_pointer, {gas: 200000})
		.then((instance) => {
			
			let contract = {
				id: instance.address,
				hash: instance.transactionHash,
				owner: node.getDefaultAccount(),
				timestamp: Date.now(),
				data: {
					hash_pointer: hash_pointer
				}
			}

			db.get('contracts').push(contract).write()
			res.json(contract)
		})
		.catch( (err) => {
  			res.json({error: err.message})
		})
	})
	.get('/:id', (req, res) => {

		let id = req.params.id || -1

		let contract = db.get('contracts').find({ id: id }).value() || {}
		
		//let instance = contracts.metadata.contract.at(id)
		//instance.get().then(result => {console.log(node.getLibInstance().toUtf8(result))})

		res.json(contract)
    })

	return router

}