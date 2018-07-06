import dotenv from 'dotenv'
import {forwardToProcessor} from './actions'
import blockchain from 'blockchain'

dotenv.config()
const PROVIDER = 'http://localhost:7545'
const ledger = blockchain()
const node = new ledger.NodeClass(PROVIDER)
const eventListener = new ledger.Listener(node.contractInstance)

const register = async () => {
  await eventListener.registerToEvent('NewRequest')

  eventListener.on('NewRequest', (req) => {
    forwardToProcessor({...req.args})
  })
}

register()
  .catch((err) => { console.log(err) })
