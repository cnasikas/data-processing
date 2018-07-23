import express from 'express'
import datastore from './datastore'
import requests from './requests'
import processors from './processors'
import contracts from './contracts'
import accounts from './accounts'

import pkg from '../package.json'

const router = express.Router()

router.get('/', (req, res) => {
  res.json({staus: 200, message: `API version ${pkg.version}`})
})

router.get('/health', (req, res) => {
  res.status(200).json({})
})

export default {
  '/': router,
  '/datastore': datastore,
  '/contracts': contracts,
  '/accounts': accounts,
  '/requests': requests,
  '/processors': processors
}
