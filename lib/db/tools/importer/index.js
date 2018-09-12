(async () => {
  const {importDatasets} = require('./datasets')
  const {importProcessors} = require('./processors')
  try {
    await importProcessors()
    await importDatasets()
  } catch (e) {
    console.log(e)
  }

  process.exit()
})()
