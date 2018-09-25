import types from './ActionTypes'
import { buildActions, createBlockchainAction } from '../utils/actions'

const dataToArgs = (data) => {
  return [data.name, data.pubkey]
}

const actions = buildActions({
  getProcessors: [types.GET_PROCESSORS, 'processors'],
  getProcessor: [types.GET_PROCESSOR, 'processors/:id'],
  addProcessor: [types.ADD_PROCESSOR, 'processors', 'post']
})

const registerProcessor = createBlockchainAction('registerProcessor', actions.addProcessor, dataToArgs)

export default {
  registerProcessor,
  ...actions
}
