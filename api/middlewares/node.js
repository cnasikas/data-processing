export default (blockchain) => {
  return (req, res, next) => {
    if (!blockchain.node.isConnected()) {
      res.status(500).json({ error: 'Ethereum node is not running!' })
      return
    }

    if (req.method === 'POST' && req.url === '/api/account') {
      next()
    }

    if (!blockchain.node.getDefaultAccount()) {
      res.status(500).json({ error: 'Account not provided!' })
      return
    }

    next()
  }
}
