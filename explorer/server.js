import bootstrap from './services/Bootstrap.js'
import Indexer from './services/Indexer.js'

bootstrap()
  .then((obj) => {
    console.log('Bootstrap normally executed')
    const indexer = new Indexer(obj.blockchain, obj.db)
  })
  .catch((err) => {
    console.error('Server error!')
    console.error(err)
  })
