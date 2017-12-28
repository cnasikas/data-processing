import mongoose from 'mongoose'
import errors from '../errors/errors.js'

export default class DB {
  constructor (host, dbName) {
    this.host = host
    this.dbName = dbName
    this.db = mongoose.connection
    this.uri = 'mongodb://' + this.host + '/' + this.dbName
    // eslint-disable-next-line max-len
    // const mongoUri = `mongodb://${env.accountName}:${env.key}@${env.accountName}.documents.azure.com:${env.port}/${env.databaseName}?ssl=true`;
    mongoose.Promise = global.Promise
    this.listeners()
  }

  connect () {
    // config: { autoIndex: false }
    return mongoose.connect(this.uri, {useMongoClient: true})
  }

  isConnected () {
    return mongoose.connection.readyState === 1
  }

  listeners () {
    this.db.on('error', console.error.bind(console, 'connection error:'))
    this.db.once('open', () => console.log('mongodb connected'))
  }

  init () {
    return this.connect()
    .catch((err) => {
      Promise.reject(err)
      throw errors.db.connection
    })
  }

  middleware () {
    return (req, res, next) => {
      if (!this.isConnected()) {
        res.status(500).json({ error: 'DB Conncection error' })
        return
      }
      next()
    }
  }
}
