import types from '../actions/ActionTypes'
import { createSimpleReducer } from '../utils/reducers'

const requests = createSimpleReducer([], { type: types.GET_REQUESTS_SUCCESS })

export default requests
