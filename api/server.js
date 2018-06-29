import express from 'express'
import bootstrap from './services/Bootstrap.js'

/* TODO: CHECK SECURITY */
/* TODO: Handle errors! */

const app = express()

bootstrap(app)
  .then((value) => {
    app.listen(process.env.PORT || 3001, function () {
      console.log(`Started on port ${this.address().port}`)
    })
  })
  .catch((err) => {
    console.error('Server error!')
    console.error(err)
  })
