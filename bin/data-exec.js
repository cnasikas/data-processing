#!/usr/bin/env node
'use string'

// Inspired by https://github.com/kmagiera/babel-watch/blob/master/babel-watch.js

const path = require('path')
const fs = require('fs')
const os = require('os')
const util = require('util')
const fork = require('child_process').fork
const execSync = require('child_process').execSync
const commander = require('commander')
const Crypto = require('total-crypto')
const blockchain = require('blockchain')

const RESTART_COMMAND = 'rs'

const program = new commander.Command('data-exec')

const pkg = require('./package.json')

program
  .version(pkg.version, '-v, --version')
  .usage('[options]')
  .description('data-exec is a js node app runner that lets you run specific commands for data sharing app')
  .option('-g, --generate-keys', 'Generate an assymetric key pair')
  .option('-s, --generate-key', 'Generate a symetric key')
  .option('-d, --dummy-file <file>', 'Generate a big dummy file')
  .option('-e, --encrypt-file <file>', 'Encrypt a file')
  .option('-a, --evaluation <bytes>', 'Evaluate cost of bytes on Ethereum')
  .on('--help', () => {
    console.log(`\
    Examples:
      $ data-exec crypto -g
    See more:
    https://github.com/cnasikas/data-market.git
    `)
  })
  .parse(process.argv)

async function evaluate (size) {
  try {
    const bl = blockchain()
    bl.node.setProvider()

    if (!bl.node.isConnected()) {
      throw new Error('Blockchain node conncection error')
    }

    await bl.node.setDefaultAccount()
    const c = new bl.ContractService()
    const contracts = c.initContracts().getContracts(true)
    let instance = await contracts.evaluation.contract.deployed()

    let data = ''
    for (let i = 0; i < (size / 32); i++) {
      data += `9f86d081884c7d659a2feaa0c55ad015` // 32 bytes ASCII
    }

    let hash = '9f86d081884c7d659a2feaa0c55ad015'

    data = bl.node.getLibInstance().fromAscii(data)
    hash = bl.node.getLibInstance().fromAscii(hash)

    let resData = await instance.storeData(data, {gas: 1000000000})
    let resHash = await instance.storeHash(hash, {gas: 1000000000})
    let resEventData = await instance.storeEvent(data, {gas: 1000000000})
    let resEventHash = await instance.storeEvent(hash, {gas: 1000000000})
    return {resData, resHash, resEventData, resEventHash}
  } catch (e) {
    throw new Error(e)
  }
}

if (!process.argv.slice(2).length) {
  program.outputHelp()
}

if (program.generateKeys) {
  let pair = new Crypto().generateKeyPair()
  console.log(`\
    Key pair for assymetric encryption using 256 bit elliptic curve generated.
    Save your keys to a secure place!!

    Public key: ${pair.pub}
    Secret key: ${pair.sec}
    `)
}

if (program.generateKey) {
  let key = new Crypto().generateKey()
  console.log(`\
    Key for symmetric encryption generated (256 bit).
    Save your key to a secure place!!

    Key: ${key}
    `)
}

if (program.dummyFile) {
  const file = fs.createWriteStream(program.dummyFile)

  for (let i = 0; i <= 1e5; i++) {
    file.write(`Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n`)
  }

  file.end()
}

if (program.encryptFile) {
  if (program.args.length !== 2) {
    console.error('Please proving a symmetric and hmac key')
    process.exit(1)
  }

  if (program.args[0].length !== 64 || program.args[1].length !== 64) {
    console.error('Key size must be 256 bit')
    process.exit(1)
  }

  let cr = new Crypto()

  let key = program.args[0]
  let hmac = program.args[1]

  cr.encryptFile(key, hmac, program.encryptFile)
}

if (program.evaluation) {
  const size = parseInt(program.evaluation)

  if (isNaN(size) || size > 10240000) {
    console.error('Max byte size: 1mb')
    process.exit(1)
  }

  evaluate(size)
  .then((value) => {
    console.log('Gas used with data: ' + value.resData.receipt.gasUsed)
    console.log('Gas used with hash: ' + value.resHash.receipt.gasUsed)
    console.log('Gas used with event data: ' + value.resEventData.receipt.gasUsed)
    console.log('Gas used with event hash: ' + value.resEventHash.receipt.gasUsed)
  })
  .catch((err) => { console.log(err) })
}
