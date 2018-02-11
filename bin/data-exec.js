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
  .on('--help', () => {
    console.log(`\
    Examples:
      $ data-exec crypto -g
    See more:
    https://github.com/cnasikas/data-market.git
    `)
  })
  .parse(process.argv)

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

  for (let i = 0; i <= 1e6; i++) {
    file.write(`Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n`)
  }

  file.end()
}

