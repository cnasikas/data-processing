export default (db) => {
  return (req, res, next) => {
    if (!db.isConnected()) {
      res.status(500).json({ error: 'DB Conncection error' })
      return
    }
    next()
  }
}
