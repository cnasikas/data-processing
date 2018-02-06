import blockchain from 'blockchain'

const bl = blockchain()

export default () => {
  return (req, res, next) => {
    if (!bl.node.isConnected()) {
      res.status(500).json({ error: 'Ethereum node is not running!' })
      return
    }

    if (req.method === 'POST' && req.url === '/api/account') {
      next()
    }

    if (!bl.node.getDefaultAccount()) {
      res.status(500).json({ error: 'Account not provided!' })
      return
    }

    next()
  }
}
