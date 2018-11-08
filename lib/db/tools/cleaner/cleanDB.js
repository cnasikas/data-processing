#!/usr/bin/env node

const logSymbols = require('log-symbols')
const { Processor, Dataset, Request, Controller } = require('../../models');

(async () => {
  console.log(logSymbols.info, 'Cleaning database...')

  await Request.destroy({
    where: {},
    truncate: { cascade: true }
  })

  await Processor.destroy({
    where: {},
    truncate: { cascade: true }
  })

  await Controller.destroy({
    where: {},
    truncate: { cascade: true }
  })

  await Dataset.destroy({
    where: {},
    truncate: { cascade: true }
  })

  console.log(logSymbols.success, 'Done!')
  process.exit()
})().catch((err) => {
  console.error(logSymbols.error, err)
  process.exit(1)
})
