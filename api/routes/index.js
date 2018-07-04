import express from 'express'
import datastore from './datastore'
import requests from './requests'
import processors from './processors'
import contracts from './contracts'
import accounts from './accounts'

const router = express.Router()

router.get('/', (req, res) => {
  res.json({msg: 'Hello World!'})
})

export default {
  '/': router,
  '/datastore': datastore,
  '/contracts': contracts,
  '/accounts': accounts,
  '/requests': requests,
  '/processors': processors
}
