import express from 'express'
import Web3 from 'web3'
import routes from './routes/routes.js'

const app = express()
const web3 = new Web3()

const port = process.env.PORT || 3000

routes(app)

app.listen(port, () => {
  console.log('Listening on port ' + port)
})