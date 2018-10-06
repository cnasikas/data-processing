import _ from './env' // eslint-disable-line no-unused-vars
import { handleProcess } from './actions'
import blockchain from 'blockchain'

const PROVIDER = process.env.PROVIDER || 'http://localhost:7545'

const register = async (node, eventListener) => {
  await eventListener.registerToEvent('Process')

  eventListener.on('Process', (req) => {
    handleProcess(node, req.args)
  })
}

const main = async () => {
  const ledger = blockchain()
  const node = new ledger.NodeClass(PROVIDER)

  console.log('[*] Processor node started')
  await node.init()
  const eventListener = new ledger.Listener(node.contractInstance)

  register(node, eventListener)
    .catch((err) => { console.log(err) })
}

main().catch((err) => {
  console.log(err.message)
  process.exit(1)
})
