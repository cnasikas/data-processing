const {Processor} = require('../models')

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

module.exports = {
  simpleSave,
}
