const { Request } = require('../../models')
const { importEntriesToBlockchain } = require('./util')

const importRequests = async (node) => {
  const datasets = [
    {
      datasetID: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08', // SHA256('test')
      algorithmID: 'sum',
      pubKey: '6b964b635b5203dacf66987c82a771117b1dc63ecd88f05a28545a8b3b2e9fdceff97590e194fc0e43c41bae719fb63bdd8c645c03675ec29ebab497be496257'
    }
  ]

  const options = {
    Model: Request,
    mapping: {
      pubKey: 'pub_key'
    },
    dbExtras: {
      address_id: 1,
      dataset_id: 1,
      argorithm_id: 1,
      process: false,
      status: 'pending'
    },
    contractFunc: 'requestProcessing'
  }

  console.log('[*] Importing requests...')
  await importEntriesToBlockchain(node, datasets, { ...options })
  console.log('[*] Done!')
}

module.exports = {
  importRequests
}
