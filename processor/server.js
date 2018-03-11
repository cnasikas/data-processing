import bootstrap from './services/Bootstrap.js'
import ProcessService from './services/Process.js'

bootstrap()
.then((blockchain) => {
  console.log('Bootstrap normally executed')
  const worker = new ProcessService(blockchain, blockchain.listener)
})
.catch((err) => {
  console.error('Server error!')
  console.error(err)
})
