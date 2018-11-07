const logSymbols = require('log-symbols')
const { Request } = require('../models')

const handleProof = async (res) => {
  const obj = {
    blockchain_id: res.args._requestID,
    processed: true
  }

  try {
    const [affectedRows] = await Request.update({ ...obj }, {
      where: {
        blockchain_id: obj.blockchain_id
      }
    })

    if (affectedRows > 0) {
      console.log(logSymbols.success, `Request with ID ${obj.blockchain_id} has been processed`)
    } else {
      console.log(logSymbols.error, `Request with ID ${obj.blockchain_id} failed to update`)
    }
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  handleProof
}
