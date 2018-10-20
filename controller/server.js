import _ from './env' // eslint-disable-line no-unused-vars
import { forwardToProcessor } from './actions'
import blockchain from 'blockchain'

const PROVIDER = process.env.PROVIDER || 'http://localhost:7545'

const main = async () => {
  const ledger = blockchain()
  const node = new ledger.NodeClass(PROVIDER)

  console.log('[*] Controller node started')
  await node.init()
  const emiter = node.contract.NewRequest()
  emiter.on('data', event => forwardToProcessor(node, event.args).catch((err) => { emiter.emit('error', err) }))
  emiter.on('error', console.error)
}

main().catch((err) => {
  console.log(err.message)
  process.exit(1)
})
