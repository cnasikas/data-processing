const express = require('express')
const app = express()
const Web3 = require('web3')
const web3 = new Web3()

const port = process.env.PORT || 3000

console.log(port);

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Listening on port ')
})