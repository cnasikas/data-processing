import mongoose from 'mongoose'

export default () => {
  return (req, res, next) => {
    if (!(mongoose.connection.readyState === 1)) {
      res.status(500).json({ error: 'DB Conncection error' })
      return
    }
    next()
  }
}
