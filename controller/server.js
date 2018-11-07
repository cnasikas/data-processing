import logSymbols from 'log-symbols'
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

  eventListener.on('error', (err) => console.log(logSymbols.error, err))
}

const main = async () => {
  const ledger = blockchain()
  const node = new ledger.NodeClass(PROVIDER)

  console.log(logSymbols.info, 'Controller node started')
  await node.init()
  const eventListener = new ledger.Listener(node.getDataStore())

  register(node, eventListener)
    .catch((err) => { console.log(logSymbols.error, err.message) })
}

main().catch((err) => {
  console.log(logSymbols.error, err.message)
  process.exit(1)
})
