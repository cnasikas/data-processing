const {
  Request,
  Dataset
} = require('../models')

class DBSaveError extends Error {
  constructor (Model, ...params) {
    super(...params)
    this.message = `Cannot save ${Model}`
  }
}

const simpleSave = async (Model, proc) => {
  try {
    return await Model.create(proc)
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

module.exports = {
  simpleSave,
  saveRequest
}
