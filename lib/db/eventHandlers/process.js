const { Request, Processor, Address } = require('../models')
const { findModel, updateModel } = require('../methods')

const handleProcess = async (res) => {
  let obj = {}

  try {
    const request = await findModel(Request, { blockchain_id: res.args._requestID })
    const address = await findModel(Address, { address: res.args._processorAddress })
    const processor = await findModel(Processor, { address_id: address.id })

    obj.processor_id = processor.id
    obj.id = request.id

    await updateModel(Request, { ...obj }, { blockchain_id: res.args._requestID }, 'processor updated')
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  handleProcess
}
