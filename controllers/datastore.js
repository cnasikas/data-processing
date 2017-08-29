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

		let address = node.getDefaultAccount()

		//let contract = db.get('contracts').get('datastore').find({ id: id }).value() || {}
		
		let instance = contracts.datastore.contract.deployed()
		.then((instance) => {
			return instance.getData.call(address)
		})
		.then((data) => {

			let response = {
				id: contracts.datastore.contract.address,
				owner: address,
				data: {
					hash_pointer: data
				}
			}

			res.json({datastore: [response]})
		})
		.catch( (err) => {
  			res.status(500).json({error: err.message})
		})

	})
	.post('/', (req, res) => {

		/* TODO: Hanlde null values on post */

		let hash_pointer = req.body.hash_pointer || ''

		contracts.datastore.contract.deployed()
		.then((instance) => {
			
			return instance.publishData(node.getDefaultAccount(), hash_pointer)
		})
		.then((result) => {
			
			let response = {
				id: contracts.datastore.contract.address,
				hash: result.tx,
				owner: node.getDefaultAccount(),
				timestamp: Date.now(),
				data: {
					hash_pointer: hash_pointer
				}
			}

			//db.get('contracts').get('datastore').push(contract).write()

			res.json(response)
		})
		.catch( (err) => {
  			res.status(500).json({error: err.message})
		})
	})
	.get('/:address', (req, res) => {
		
		let address = req.params.address || -1

		//let contract = db.get('contracts').get('datastore').find({ id: id }).value() || {}
		
		let instance = contracts.datastore.contract.deployed()
		.then((instance) => {
			return instance.getData.call(address)
		})
		.then((data) => {

			res.json({data: data})
		})
		.catch( (err) => {
  			res.status(500).json({error: err.message})
		})
    })

	return router

}