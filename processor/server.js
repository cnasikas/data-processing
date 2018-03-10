import bootstrap from './services/Bootstrap.js'

bootstrap()
.then((blockchain) => {
  console.log('Bootstrap normally executed')
})
.catch((err) => {
  console.error('Server error!')
  console.error(err)
})
