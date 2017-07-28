import node from '../services/Node.js'

export default () => {

	return (req, res, next) => {

		if(!node.isConnected()){
			res.status(500).json({ error: 'Ethereum node is not running!' })
			return
		}

		if(!node.getDefaultAccount()){
			res.status(500).json({ error: 'Account not provided!' })
			return
		}

		next()
	}

}