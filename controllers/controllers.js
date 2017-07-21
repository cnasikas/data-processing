import { Router } from 'express'
import contracts from './contracts'

export default ({config}) => {
    
    let router = Router();

	/* Routes */

	router.use('/contracts', contracts({config}))

	router.get('/', (req, res) => {
  		res.json({msg: 'Hello World!'})
	})

	return router

}