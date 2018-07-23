const {Processor} = require('../models')

class DBSaveError extends Error {
  constructor (Model, ...params) {
    super(...params)
    this.message = `Cannot save ${Model}`
  }
}

const saveProcessor = async (proc) => {
  try {
    return await Processor.create(proc)
  } catch (error) {
    throw new DBSaveError(Processor)
  }
}

module.exports = {
  saveProcessor
}
