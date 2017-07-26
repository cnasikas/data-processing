import { Router } from 'express'
import contracts from './contracts'
import node from '../services/Node.js'


export default ({config}) => {
    
    const router = Router()
    
	/* Routes */

	router.use('/contracts', contracts({config}))

	router.get('/', (req, res) => {
  		res.json({msg: 'Hello World!'})
	})

	return router

}