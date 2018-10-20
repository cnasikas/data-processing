import _ from './env' // eslint-disable-line no-unused-vars
import { handleProcess } from './actions'
import blockchain from 'blockchain'

const PROVIDER = process.env.PROVIDER || 'http://localhost:7545'

const main = async () => {
  const ledger = blockchain()
  const node = new ledger.NodeClass(PROVIDER)

  try {
    console.log('[*] Processor node started')
    await node.init()
    const emiter = node.contract.Process()
    emiter.on('data', event => handleProcess(node, event.args).catch((err) => { emiter.emit('error', err) }))
    emiter.on('error', console.error)
  } catch (e) {
    throw e
  }
}

main().catch((err) => {
  console.log(err.message)
  process.exit(1)
})
