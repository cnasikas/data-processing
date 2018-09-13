const {Processor, Controller} = require('../../models')
const {importEntries} = require('./util')

const _generateEntityOptions = (Model, contractFunc) => {
  return {
    Model,
    mapping: {
      name: 'name',
      pub_key: 'pubkey'
    },
    dbExtras: {
      address_id: 1,
      status: 'pending'
    },
    contractFunc
  }
}

const importProcessors = async () => {
  const processors = [
    {
      name: 'PR #1',
      pubkey: 'e768dba9090d778ecbeae58d08303c261d698e22c22b19243c6c8d82bcc67ec7c1459f4ff46c24ca64eaa356a39051794d586ca391a364a143beb850ee0ea472'
    }
  ]

  const options = _generateEntityOptions(Processor, 'registerProcessor')

  console.log('[*] Importing processors...')
  await importEntries(processors, {...options})
  console.log('[*] Done!')
}

const importControllers = async () => {
  const controllers = [
    {
      name: 'CR #1',
      pubkey: '6b964b635b5203dacf66987c82a771117b1dc63ecd88f05a28545a8b3b2e9fdceff97590e194fc0e43c41bae719fb63bdd8c645c03675ec29ebab497be496257'
    }
  ]

  const options = _generateEntityOptions(Controller, 'registerController')

  console.log('[*] Importing controllers...')
  await importEntries(controllers, {...options})
  console.log('[*] Done!')
}

const importEntities = async () => {
  await importProcessors()
  await importControllers()
}

module.exports = {
  importProcessors,
  importControllers,
  importEntities
}
