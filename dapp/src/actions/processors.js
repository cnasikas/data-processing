import types from './ActionTypes'
import {buildActions} from '../utils/actions'

const actions = buildActions({
  getProcessors: [types.GET_PROCESSORS, 'processors'],
  getProcessor: [types.GET_PROCESSOR, 'processors/:id'],
  addProcessor: [types.ADD_PROCESSOR, 'processors', 'post']
})

export default actions
