(async () => {
  const dotenv = require('dotenv')
  const path = require('path')
  dotenv.config({ path: path.join(__dirname, '../../.env') })

  const { importDataSets } = require('./datasets')
  const { importEntities } = require('./entities')

  try {
    await importEntities()
    await importDataSets()
  } catch (e) {
    console.log(e)
  }

  process.exit()
})()
