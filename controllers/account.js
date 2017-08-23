import { Router } from 'express'

import node from '../services/Node.js'

export default ({config}) => {
    
    let router = Router();

	/* Routes */

	router.get('/', (req, res) => {

		let account = { 
			address: node.getDefaultAccount(),
			balance: node.getBalance(node.getDefaultAccount())
		}

  		res.json(account)
	})

	return router

}