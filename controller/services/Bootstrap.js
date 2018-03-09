import dotenv from 'dotenv'

import blockchain from 'blockchain'

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
  return bl
}
