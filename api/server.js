import _ from './env' // eslint-disable-line no-unused-vars
import express from 'express'
import logSymbols from 'log-symbols'

import bootstrap from './services/Bootstrap.js'

const app = express()

app.get('/api/health', (_, res) => res.status(204).send())

bootstrap(app)

app.listen(process.env.PORT || 3001, function () {
  console.log(logSymbols.info, `Started on port ${this.address().port}`)
})
