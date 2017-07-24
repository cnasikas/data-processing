import { Router } from 'express'
import contracts from './contracts'
import Node from '../services/NodeBuilder.js'

export default ({config}) => {
    
    let router = Router()
    let node = Node()
    
	/* Routes */

	router.use('/contracts', contracts({config}))

	router.get('/', (req, res) => {
  		res.json({msg: 'Hello World!'})
	})

	return router

}