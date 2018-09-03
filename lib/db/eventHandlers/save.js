const _ = require('lodash')
const {Address} = require('../models')

const saveWithAddress = async (Model, obj, address) => {
  if (_.isEmpty(address)) {
    throw new Error('Null address is not allowed')
  }

  let addr = await Address.findOrCreate({
    where: {
      address
    },
    defaults: {
      address,
      user_id: 1 // anonymous user
    }
  })

  const addrId = addr[0].dataValues.id // sequelize returs an array

  obj.address_id = addrId

  const model = await Model.findOne({
    where: {
      tx_id: obj.tx_id
    }
  })

  if (model === null) {
    const newModel = await Model.create({...obj})
    const modelName = newModel._modelOptions.name.singular

    console.log(`[*] ${modelName} ${newModel.id} saved to database`)
  } else {
    const modelName = model._modelOptions.name.singular
    const [affectedRows] = await Model.update({
      status: 'confirmed'
    }, {
      where: {
        tx_id: obj.tx_id
      }
    })

    if (affectedRows > 0) {
      console.log(`[*] ${modelName} ${model.id} status updated to CONFIRMED`)
    } else {
      console.log(`[!] Dataset with ID ${model.id} failed to update`)
    }
  }
}

module.exports = {
  saveWithAddress
}
