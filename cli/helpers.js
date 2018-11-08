const _ = require('lodash')
const Table = require('cli-table3')
const blockchain = require('blockchain')
const logSymbols = require('log-symbols')

const printTable = (head, rows) => {
  const table = new Table({
    head
  })

  for (let row of rows) {
    table.push(Object.values(row))
  }
  console.log(table.toString())
}

const _buildHandler = (key, handlerFunc) => {
  return async (argv) => {
    await handlerFunc(argv, key)
  }
}

const _initBlockchain = async (provider) => {
  const ledger = blockchain()
  const node = new ledger.NodeClass(provider)
  await node.init()

  return node
}

const buildCommand = (cmd, subCmds = {}) => {
  const buildedSubCmds = {}

  for (let key in subCmds.entries) {
    if (subCmds.entries.hasOwnProperty(key)) {
      buildedSubCmds[key] = {}
      const [options, entityHandler] = subCmds.entries[key]

      buildedSubCmds[key].command = subCmds.options.cmd.replace(':key', key)
      buildedSubCmds[key].desc = subCmds.options.desc.replace(':key', key)
      buildedSubCmds[key].builder = { ...options }
      buildedSubCmds[key].handler = _buildHandler(key, entityHandler)
    }
  }

  const mainCmdbuilder = (yargs) => {
    for (const key in buildedSubCmds) {
      if (buildedSubCmds.hasOwnProperty(key)) {
        yargs.command(buildedSubCmds[key])
      }
    }
    return yargs
  }

  return {
    command: cmd.command,
    desc: cmd.desc,
    builder: mainCmdbuilder,
    handler: (argv) => {}
  }
}

const importEntries = async (node, entries, contractFunc, name = 'Entity') => {
  const txs = []
  for (let entry of entries) {
    const tx = await node[contractFunc](...Object.values(entry))
    txs.push(tx)
  }

  const zip = _.zipWith(entries, txs, (entry, tx) => {
    entry.tx = tx
    return entry
  })

  console.log(logSymbols.success, `${name}(s) imported!`)
  printTable(Object.keys(entries[0]), zip)

  return txs
}

const handleEntity = async (argv, key) => {
  const node = await _initBlockchain(argv.p)

  let contractFunc = 'registerProcessor'
  let name = 'Processor'

  if (key === 'controller') {
    contractFunc = 'registerController'
    name = 'Controller'
  }

  const entity = {
    name: argv.n,
    pubkey: argv.k,
    account: argv.a
  }

  let entries = [entity]

  await importEntries(node, entries, contractFunc, name)
}

const handleDataset = async (argv, key) => {
  const node = await _initBlockchain(argv.p)

  const dataset = {
    hash: argv.h,
    name: argv.n,
    location: argv.l,
    category: argv.c,
    metadata: JSON.stringify({ iv: argv.m[0] })
  }

  let entries = [dataset]

  await importEntries(node, entries, 'registerDataSet', 'Dataset')
}

const handleRequest = async (argv, key) => {
  const node = await _initBlockchain(argv.p)

  const dataset = {
    datasetID: argv.d,
    algorithmID: argv.a,
    pubKey: argv.k
  }

  let entries = [dataset]

  await importEntries(node, entries, 'requestProcessing', 'Request')
}

const handleAll = async (argv, key) => {
  const node = await _initBlockchain(argv.p)

  const processors = [
    {
      name: 'PR #1',
      pubkey: 'e768dba9090d778ecbeae58d08303c261d698e22c22b19243c6c8d82bcc67ec7c1459f4ff46c24ca64eaa356a39051794d586ca391a364a143beb850ee0ea472',
      account: '0x0deD0E1cea8b62eb073BA285a8b8e199122E4509'
    }
  ]

  const controllers = [
    {
      name: 'CR #1',
      pubkey: '6b964b635b5203dacf66987c82a771117b1dc63ecd88f05a28545a8b3b2e9fdceff97590e194fc0e43c41bae719fb63bdd8c645c03675ec29ebab497be496257',
      account: '0x0deD0E1cea8b62eb073BA285a8b8e199122E4509'
    }
  ]

  const datasets = [
    {
      hash: 'b5cf9fbf6e9b2585921c63719a18ba5fbb3d94bd555b8af9add17f9fcb983834',
      name: 'Dataset #1',
      location: 'http://localhost:3003/datastore/b5cf9fbf6e9b2585921c63719a18ba5fbb3d94bd555b8af9add17f9fcb983834',
      category: 'Health',
      metadata: JSON.stringify({ iv: 'ef174e9c0118450a15efaaf1d17521b3' })
    }
  ]

  const requests = [
    {
      datasetID: 'b5cf9fbf6e9b2585921c63719a18ba5fbb3d94bd555b8af9add17f9fcb983834',
      algorithmID: 'sum',
      pubKey: '6b964b635b5203dacf66987c82a771117b1dc63ecd88f05a28545a8b3b2e9fdceff97590e194fc0e43c41bae719fb63bdd8c645c03675ec29ebab497be496257'
    }
  ]

  await importEntries(node, processors, 'registerProcessor', 'Processor')
  await importEntries(node, controllers, 'registerController', 'Controller')
  await importEntries(node, datasets, 'registerDataSet', 'Dataset')
  await importEntries(node, requests, 'requestProcessing', 'Request')
}

module.exports = {
  buildCommand,
  printTable,
  handleEntity,
  handleDataset,
  handleRequest,
  handleAll
}
