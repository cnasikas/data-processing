const Crypto = require('total-crypto')
const colors = require('colors')
const logSymbols = require('log-symbols')

const { printTable } = require('../helpers')

const keyPairCmd = {
  command: 'pair',
  desc: 'Generates a key pair',
  builder: {},
  handler: (argv) => {
    let pair = new Crypto().generateKeyPair()
    console.log(logSymbols.success, 'Key pair generated!')
    printTable(Object.keys(pair), [pair])
    console.log(colors.red(logSymbols.warning, 'Secure your keys!!'))
  }
}

const symKeyCmd = {
  command: 'sym',
  desc: 'Generates a symmetric key',
  builder: {},
  handler: (argv) => {
    let key = new Crypto().generateKey()
    console.log(logSymbols.success, 'Symmetric key generated!')
    printTable(['key'], [{ key }])
    console.log(colors.red(logSymbols.warning, 'Secure your keys!!'))
  }
}

const cmd = {
  command: 'generate <command>',
  desc: 'Generate <pair|sym>',
  builder: (yargs) => {
    yargs.command(keyPairCmd)
    yargs.command(symKeyCmd)
  },
  handler: (argv) => {}
}

module.exports = cmd
