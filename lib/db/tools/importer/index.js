(async () => {
  const {importDataSets} = require('./datasets')
  const {importEntities} = require('./entities')
  try {
    await importEntities()
    await importDataSets()
  } catch (e) {
    console.log(e)
  }

  process.exit()
})()
