import { Router } from 'express'
import artifactor from 'truffle-artifactor'

import contracts from '../services/Contracts.js'

export default ({config}) => {
    
    let router = Router();

	/* Contract Routes */

	router.get('/', (req, res) => {

		let types = []

		for (let key of Object.keys(contracts)) {
			let temp = {id: contracts[key].id, title: contracts[key].title, desc: contracts[key].desc}
		    types.push(temp)
		}

  		res.json({types: types})

	})

	return router

}