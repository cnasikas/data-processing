/* Processor should be autonomous from api.
* Contracts migration and deploy would be permanent on blockchain
*/

import bootstrap from './services/Bootstrap.js'

bootstrap()
.then((value) => {
  console.log('Bootstrap normally executed')
})
.catch((err) => {
  console.error('Server error!')
  console.error(err)
})
