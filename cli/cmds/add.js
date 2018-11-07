const { buildCommand, handleEntity, handleDataset, handleRequest, handleAll } = require('../helpers')

const commonOptions = {
  provider: {
    alias: 'p',
    describe: `The url of the rcp node`,
    demandOption: true
  }
}

const entityOptions = {
  name: {
    alias: 'n',
    describe: `The name of the entity`,
    demandOption: true
  },
  pubkey: {
    alias: 'k',
    describe: `The public key of the entity`,
    demandOption: true
  },
  address: {
    alias: 'a',
    describe: `The address of the entity`,
    demandOption: true
  }
}

const datasetOptions = {
  hash: {
    alias: 'h',
    describe: `The name of the dataset`,
    demandOption: true
  },
  name: {
    alias: 'n',
    describe: `The name of the dataset`,
    demandOption: true
  },
  location: {
    alias: 'l',
    describe: `The location of the dataset`,
    demandOption: true
  },
  category: {
    alias: 'c',
    describe: `The category of the dataset`,
    demandOption: true
  },
  metadata: {
    type: 'array',
    alias: 'm',
    describe: `The metadata of the dataset: [iv]`,
    demandOption: true
  }
}

const requestOptions = {
  datasetID: {
    alias: 'd',
    describe: `The dataset ID`,
    demandOption: true
  },
  algorithmID: {
    alias: 'a',
    describe: `The algorithm ID`,
    demandOption: true
  },
  pubKey: {
    alias: 'k',
    describe: `The public key of the requestor`,
    demandOption: true
  }
}

const subCommands = {
  options: { cmd: ':key', desc: 'Add :key' },
  entries: {
    processor: [{ ...commonOptions, ...entityOptions }, handleEntity],
    controller: [{ ...commonOptions, ...entityOptions }, handleEntity],
    dataset: [{ ...commonOptions, ...datasetOptions }, handleDataset],
    request: [{ ...commonOptions, ...requestOptions }, handleRequest],
    all: [{ ...commonOptions }, handleAll]
  }
}

const cmd = {
  command: 'add <command>',
  desc: 'Add to blockchain: <processor|controller|dataset|request|all>'
}

module.exports = buildCommand(cmd, subCommands)
