(async () => {
  const {importProcessors} = require('./processors')
  const {importDataSets} = require('./datasets')
  try {
    await importProcessors()
    await importDataSets()
  } catch (e) {
    console.log(e)
  }

  process.exit()
})()
