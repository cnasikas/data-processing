import _ from 'lodash'
import dotenv from 'dotenv'

/* TODO: Fix dependency on api. Create local modules. */

import blockchain from 'blockchain'
import Listener from './Listener.js'

const bl = blockchain()

function setENV () {
  dotenv.config()
}

function initNode () {
  return new Promise((resolve, reject) => {
    bl.node.setProvider()
    if (!bl.node.isConnected()) {
      reject(new Error('Blockchain node conncection error'))
    }
    bl.node.setDefaultAccount()
    .then((value) => { resolve(value) })
    .catch((err) => { reject(err) })
  })
}

export default async () => {
  setENV()

  await initNode()
  await new bl.ContractService().initContracts()
  await new Listener()
}
