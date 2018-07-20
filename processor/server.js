import dotenv from 'dotenv'
import {process} from './actions'
import blockchain from 'blockchain'

dotenv.config()
const PROVIDER = 'http://localhost:7545'
const ledger = blockchain()
const node = new ledger.NodeClass(PROVIDER)
const eventListener = new ledger.Listener(node.contractInstance)

console.log('[*] Processor node started')

const register = async () => {
  await eventListener.registerToEvent('Process')

  eventListener.on('Process', (req) => {
    process({...req.args})
  })
}

register()
  .catch((err) => { console.log(err) })
