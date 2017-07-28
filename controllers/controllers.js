import { Router } from 'express'
import contracts from './contracts'
import account from './account'

export default ({config}) => {
    
    const router = Router()
    
	/* Routes */

	router.use('/contracts', contracts({config}))
	router.use('/account', account({config}))

	router.get('/', (req, res) => {
  		res.json({msg: 'Hello World!'})
	})

	return router

}