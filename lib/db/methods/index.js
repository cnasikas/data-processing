const _ = require('lodash')
const { Request, Dataset, Address } = require('../models')

class DBSaveError extends Error {
  constructor (Model, ...params) {
    super(...params)
    this.message = `Cannot save ${Model.name}`
  }
}

class DBNotFoundError extends Error {
  constructor (Model, ...params) {
    super(...params)
    this.message = `${Model.name} not found`
  }
}

const findModel = async (Model, lookby = {}) => {
  const model = await Model.findOne({
    attributes: ['id'],
    where: { ...lookby }
  })

  if (model === null) {
    throw new DBNotFoundError(Model)
  }

  return model
}

const simpleSave = async (Model, obj) => {
  try {
    return await Model.create({ ...obj })
  } catch (error) {
    throw new DBSaveError(Model)
  }
}

const saveRequest = async (datasetID, request) => {
  try {
    const dataset = await Dataset.findOne({
      attributes: ['id'],
      where: {
        hash: datasetID
      }
    })

    if (dataset === null) {
      throw new Error('Invalid dataset')
    }

    request.dataset_id = dataset.id

    return await Request.create(request)
  } catch (error) {
    throw new DBSaveError(Request)
  }
}

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
    const newModel = await Model.create({ ...obj })
    const modelName = newModel._modelOptions.name.singular

    console.log(`[*] ${modelName} ${newModel.id} saved to database`)
  } else {
    const modelName = model._modelOptions.name.singular
    const [affectedRows] = await Model.update({ ...obj }, {
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
  simpleSave,
  saveRequest,
  findModel,
  saveWithAddress
}
