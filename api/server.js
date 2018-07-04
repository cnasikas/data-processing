import express from 'express'
import bootstrap from './services/Bootstrap.js'

/* TODO: CHECK SECURITY */
/* TODO: Handle errors! */

const app = express()

app.get('/api/health', (_, res) => res.status(204).send())

bootstrap(app)

app.listen(process.env.PORT || 3001, function () {
  console.log(`Started on port ${this.address().port}`)
})
