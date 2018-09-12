const {Dataset} = require('../../models')
const {importEntries} = require('./util')

const importDatasets = async () => {
  const datasets = [
    {
      name: 'Dataset #1',
      hash: 'e768dba9090d778ecbeae58d08303c261d698e22c22b19243c6c8d82bcc67ec7c1459f4ff46c24ca64eaa356a39051794d586ca391a364a143beb850ee0ea472',
      location: 'http://localhost:3000/datastore/1/download',
      category: 'Health'
    }
  ]

  const options = {
    Model: Dataset,
    mapping: {
      name: 'name',
      location: 'location',
      hash: 'hash',
      category: 'category'
    },
    dbExtras: {
      address_id: 1,
      meta_hash: '',
      status: 'pending'
    },
    contractFunc: 'registerDataset'
  }

  console.log('[*] Importing datasets...')
  await importEntries(datasets, {...options})
  console.log('[*] Done!')
}

module.exports = {
  importDatasets
}
