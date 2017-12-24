import mongoose from 'mongoose'

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

  listeners () {
    this.db.on('error', console.error.bind(console, 'connection error:'))
    this.db.once('open', () => console.log('mongodb connected'))
  }
}
