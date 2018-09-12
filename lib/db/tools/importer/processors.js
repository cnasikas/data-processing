const {Processor} = require('../../models')
const {importEntries} = require('./util')

const importProcessors = async () => {
  const processors = [
    {
      name: 'PR #1',
      pubkey: 'e768dba9090d778ecbeae58d08303c261d698e22c22b19243c6c8d82bcc67ec7c1459f4ff46c24ca64eaa356a39051794d586ca391a364a143beb850ee0ea472'
    }
  ]

  const options = {
    Model: Processor,
    mapping: {
      name: 'name',
      pub_key: 'pubkey'
    },
    dbExtras: {
      address_id: 1,
      status: 'pending'
    },
    contractFunc: 'registerProcessor'
  }

  console.log('[*] Importing processors...')
  await importEntries(processors, {...options})
  console.log('[*] Done!')
}

module.exports = {
  importProcessors
}
