const mongoose = require('mongoose')
const AbstractDB = require('../AbstractDB')
const schemes = require('./schemes/schemes')
const models = require('./models/models')

module.exports = class MongoDB extends AbstractDB {
  constructor (host, dbName) {
    super()
    this.host = host
    this.dbName = dbName
    this.db = mongoose.connection
    this.uri = 'mongodb://' + this.host + '/' + this.dbName
    this.instance = null
    mongoose.Promise = global.Promise
    this.schemes = schemes
    this.models = models
    this.listeners()
  }

  connect () {
    return mongoose.connect(this.uri)
  }

  isConnected () {
    return mongoose.connection.readyState === 1
  }

  listeners () {
    this.db.on('error', console.error.bind(console, 'connection error:'))
    this.db.once('open', () => console.log('mongodb connected'))
  }

  async init () {
    this.instance = await this.connect()
    return this
  }

  getInstance () {
    return this.instance
  }

  async save (model, obj) {
    const res = await new this.models[model](obj).save()
    return res
  }

  async get (model, id) {
    const res = await this.models[model].findById(id)
    return res
  }

  async getCollection (model) {
    const res = await this.models[model].find().limit(10).sort({created_at: 'desc'})
    return res
  }
}
