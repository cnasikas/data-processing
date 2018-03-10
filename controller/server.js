/* Processor should be autonomous from api.
* Contracts migration and deploy would be permanent on blockchain
*/

import FordwardService from './services/FordwardService.js'
import bootstrap from './services/Bootstrap.js'

bootstrap()
.then((blockchain) => {
  console.log('Bootstrap normally executed')
  const worker = new FordwardService(blockchain.listener)
})
.catch((err) => {
  console.error('Server error!')
  console.error(err)
})
