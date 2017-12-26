import mongoose from 'mongoose'
import DataStore from '../db/models/DataStore'
import User from '../db/models/User'
import Account from '../db/models/Account'
import node from './Node.js'
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
    .then((conn) => {
      return this.createUser()
    })
    .then((user) => {
      return this.createDataStore(user)
    })
    .catch((err) => {
      Promise.reject(err)
      throw errors.db.connection
    })
  }

  createDataStore (user) {
    return new DataStore({user: user, data: []}).save()
  }

  createUser () {
    return new Account({address: node.getDefaultAccount()})
    .save()
    .then((account) => {
      return new User({username: 'admin', password: 'admin', accounts: [account]}).save()
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
