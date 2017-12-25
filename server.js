import express from 'express'
import DB from './services/DB.js'
import bootstrap from './services/Bootstrap.js'
import config from './config.json'

/* TODO: CHECK SECURITY */
/* TODO: Handle errors! */

const app = express()
const db = new DB(config.db.host, config.db.name)
bootstrap({app, db})

app.listen(process.env.PORT || 3001, function () {
  console.log(`Started on port ${this.address().port}`)
})
