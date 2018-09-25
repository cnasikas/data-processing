const { Dataset } = require('../../models')
const { importEntries } = require('./util')

const importDataSets = async () => {
  const datasets = [
    {
      hash: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08', // SHA256('test')
      name: 'Dataset #1',
      location: 'http://localhost:3001/api/datastore/9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08/get',
      category: 'Health',
      metadata: JSON.stringify({ iv: '3ec7cf091636fd12d28aeaa5e4d614e6' })
    }
  ]

  const options = {
    Model: Dataset,
    mapping: {
      name: 'name',
      location: 'location',
      hash: 'hash',
      category: 'category',
      metadata: 'metadata'
    },
    dbExtras: {
      address_id: 1,
      status: 'pending'
    },
    contractFunc: 'registerDataSet'
  }

  console.log('[*] Importing datasets...')
  await importEntries(datasets, { ...options })
  console.log('[*] Done!')
}

module.exports = {
  importDataSets
}
