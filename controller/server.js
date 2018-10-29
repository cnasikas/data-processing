import _ from './env' // eslint-disable-line no-unused-vars
import { forwardToProcessor } from './actions'
import api from './api'
import blockchain from 'blockchain'

const PROVIDER = process.env.PROVIDER || 'http://localhost:7545'

api()

const register = async (node, eventListener) => {
  await eventListener.registerToEvent('NewRequest')

  eventListener.on('NewRequest', (req) => {
    forwardToProcessor(node, req.args).catch((err) => { eventListener.emit('error', err) })
  })

  eventListener.on('error', console.error)
}

const main = async () => {
  const ledger = blockchain()
  const node = new ledger.NodeClass(PROVIDER)

  console.log('[*] Controller node started')
  await node.init()
  const eventListener = new ledger.Listener(node.getDataStore())

  register(node, eventListener)
    .catch((err) => { console.log(err.message) })
}

main().catch((err) => {
  console.log(err.message)
  process.exit(1)
})
