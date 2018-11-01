const _ = require('lodash')
const { Request, Dataset, Address, Algorithm } = require('../models')

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

const createRequest = async (datasetID, request, address) => {
  try {
    const dataset = await findModel(Dataset, { hash: datasetID })
    const algorithm = await findModel(Algorithm, { name: request.algorithm_id })

    request.dataset_id = dataset.id
    request.algorithm_id = algorithm.id

    return await createWithAddress(Request, request, address)
  } catch (error) {
    console.log(error)
    throw new DBSaveError(Request)
  }
}

const saveAddress = async (address) => {
  if (_.isEmpty(address)) {
    throw new Error('Empty address is not allowed')
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

  return addr[0].dataValues.id // sequelize returs an array
}

const createWithAddress = async (Model, obj, address) => {
  const addrId = await saveAddress(address)

  obj.address_id = addrId

  let model = await Model.findOne({
    where: {
      tx_id: obj.tx_id
    }
  })

  if (model === null) {
    const newModel = await Model.create({ ...obj })
    const modelName = newModel._modelOptions.name.singular
    model = newModel

    console.log(`[*] ${modelName} ${newModel.id} saved to database`)
  }

  return model
}

const updateModel = async (Model, obj, lookby = {}, updateMsg = 'updated') => {
  const [affectedCount] = await Model.update({ ...obj }, {
    where: { ...lookby }
  })

  if (affectedCount > 0) {
    console.log(`[*] ${Model.name} ${obj.id} ${updateMsg}`)
  } else {
    console.log(`[!] ${Model.name} with ID ${obj.id} not updated`)
  }
}

const saveWithAddress = async (Model, obj, address) => {
  const model = await createWithAddress(Model, obj, address)

  if (!model._options.isNewRecord) {
    obj.id = model.id
    updateModel(Model, { ...obj }, { tx_id: obj.tx_id })
  }
}

module.exports = {
  simpleSave,
  createRequest,
  findModel,
  saveWithAddress,
  createWithAddress,
  updateModel
}
