const {Dataset} = require('../../models')
const {importEntries} = require('./util')

const importDataSets = async () => {
  const datasets = [
    {
      hash: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08', // SHA256('test')
      name: 'Dataset #1',
      location: 'http://localhost:3001/datastore/0x9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08/get',
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
    contractFunc: 'registerDataSet'
  }

  console.log('[*] Importing datasets...')
  await importEntries(datasets, {...options})
  console.log('[*] Done!')
}

module.exports = {
  importDataSets
}
