/* Processor should be autonomous from api.
* Contracts migration and deploy would be permanent on blockchain
*/

import FordwardService from './services/FordwardService.js'
import bootstrap from './services/Bootstrap.js'

bootstrap()
.then((value) => {
  console.log('Bootstrap normally executed')
  const worker = new FordwardService()
})
.catch((err) => {
  console.error('Server error!')
  console.error(err)
})
