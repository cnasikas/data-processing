import types from '../actions/ActionTypes'
import { createSimpleReducer } from '../utils/reducers'

const controllers = createSimpleReducer([], { type: types.GET_CONTROLLERS_SUCCESS })

export default controllers
