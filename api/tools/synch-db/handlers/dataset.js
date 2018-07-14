const Sequelize = require('sequelize')
const {Dataset, Address} = require('../../../models')

const ETH_TO_WEI = 1000000000000000000

const handleDataset = async (res) => {
  console.log(res)
  const datasetObj = {
    tx_id: res.transactionHash,
    hash: res.args.hash,
    name: res.args.name,
    location: res.args.location,
    category: res.args.category,
    meta_hash: res.args.metaHash,
    status: 'confirmed'
  }

  let addr = await Address.findOrCreate({
    where: {
      hash: res.args.controller
    },
    defaults: {
      hash: res.args.controller,
      user_id: 1 // anonymous user
    }
  })

  const addrId = addr[0].dataValues.id // sequelize returs an array

  datasetObj.address_id = addrId

  const dataset = await Dataset.findOne({
    where: {
      tx_id: datasetObj.tx_id
    }
  })

  if (dataset == null) {
    const newDataset = await Dataset.create(...datasetObj)

    console.log('Dataset ' + newDataset.id + ' saved to database')
  } else {
    const [affectedRows] = await Dataset.update({
      status: 'confirmed'
    }, {
      where: {
        tx_id: datasetObj.tx_id
      }
    })

    if (affectedRows > 0) {
      console.log('Dataset ' + dataset.id + ' status updated to CONFIRMED')
    } else {
      console.log('[!] Dataset with ID ' + dataset.id + ' failed to update')
    }
  }
}

module.exports = {
  handleDataset
}
