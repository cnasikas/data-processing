import express from 'express'
import db from 'db'
import bootstrap from './services/Bootstrap.js'
import config from './config.json'

/* TODO: CHECK SECURITY */
/* TODO: Handle errors! */

const app = express()
const mongo = new db.MongoDB(config.db.host, config.db.name)

bootstrap(app, mongo)
  .then((value) => {
    app.listen(process.env.PORT || 3001, function () {
      console.log(`Started on port ${this.address().port}`)
    })
  })
  .catch((err) => {
    console.error('Server error!')
    console.error(err)
  })
