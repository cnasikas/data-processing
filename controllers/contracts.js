import { Router } from 'express'

export default ({config}) => {
    
    let router = Router();

	/* Routes */

	router.get('/', (req, res) => {
  		res.json({msg: 'Hello contract!'})
	})

	return router

}