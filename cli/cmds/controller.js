const path = require('path')
const Crypto = require('total-crypto')
const dsm = require('dataset-manager')
const logSymbols = require('log-symbols')
const { printTable } = require('../helpers')

const fileCmd = {
  command: 'file <src> <dest>',
  desc: 'Imports a dataset',
  builder: {},
  handler: async (argv) => {
    let datasetManager = dsm('http', path.join(argv.dest))
    let crypto = new Crypto()
    datasetManager.initStructure()

    let key = crypto.generateKey()
    console.log(logSymbols.success, 'Key generated!')

    let hash = await crypto.hashFile(argv.src)
    console.log(logSymbols.success, 'File\'s hash calculated!')

    await datasetManager.writeKey(hash, key)
    console.log(logSymbols.success, 'Key saved to file!')

    let enc = await crypto.encryptFile(key, argv.src, datasetManager.getEncPath(hash))
    console.log(logSymbols.success, 'File encrypted!')
    enc.hash = hash
    enc.dest = path.resolve(enc.dest)
    await datasetManager.writeFileMeta(hash, JSON.stringify({ iv: enc.iv }))
    console.log(logSymbols.success, 'Metadata saved to file!')

    console.log(logSymbols.success, 'File successfully imported!')
    printTable(Object.keys(enc), [enc])
  }
}

const cmd = {
  command: 'controller <command>',
  desc: 'Controller commands: <file>',
  builder: (yargs) => {
    yargs.command(fileCmd)
      .positional('src', {
        describe: 'The source file',
        type: 'string',
        normalize: true
      })
      .positional('dest', {
        describe: 'The destination file',
        type: 'string',
        normalize: true
      })
  },
  handler: (argv) => {}
}

module.exports = cmd
