(async () => {
  const blockchain = require('blockchain')
  const {Processor} = require('../../models')
  const {simpleSave} = require('../../utils/db')
  const PROVIDER = 'http://localhost:7545'

  const processors = [
    {
      name: 'PR #1',
      pubkey: 'e768dba9090d778ecbeae58d08303c261d698e22c22b19243c6c8d82bcc67ec7c1459f4ff46c24ca64eaa356a39051794d586ca391a364a143beb850ee0ea472',
      status: 'pending'
    }
  ]

  console.log('[*] Importing processors...')

  const ledger = blockchain()
  const node = new ledger.NodeClass(PROVIDER)

  for (const proc of processors) {
    try {
      const res = await node.registerProcessor(proc.name, proc.pubkey)
      await simpleSave(Processor, {
        name: proc.name,
        pub_key: proc.pubkey,
        address_id: 1,
        tx_id: res.tx,
        status: 'pending'
      })
    } catch (e) {
      console.log(e)
    }
  }

  console.log('[*] Done!')
  process.exit()
})()
