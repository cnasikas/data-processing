import '@babel/polyfill'
import express from 'express'
import dotenv from 'dotenv'
import path from 'path'

import bootstrap from './services/Bootstrap.js'

/* TODO: CHECK SECURITY */
/* TODO: Handle errors! */

dotenv.config({ path: path.join(__dirname, '.env') })

const app = express()

app.get('/api/health', (_, res) => res.status(204).send())

bootstrap(app)

app.listen(process.env.PORT || 3001, function () {
  console.log(`Started on port ${this.address().port}`)
})
