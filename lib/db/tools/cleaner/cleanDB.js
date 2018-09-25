(async () => {
  const { Processor, Dataset, Request, Controller } = require('../../models')
  console.log('[*] Cleaning database...')

  try {
    await Request.destroy({
      where: {},
      truncate: { cascade: true }
    })

    await Processor.destroy({
      where: {},
      truncate: { cascade: true }
    })

    await Controller.destroy({
      where: {},
      truncate: { cascade: true }
    })

    await Dataset.destroy({
      where: {},
      truncate: { cascade: true }
    })
  } catch (e) {
    console.log(e)
  }

  console.log('[*] All cleaned!')
  process.exit()
})()
