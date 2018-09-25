import types from '../actions/ActionTypes'
import { createSimpleReducer } from '../utils/reducers'

const processors = createSimpleReducer([], { type: types.GET_PROCESSORS_SUCCESS })

export default processors
