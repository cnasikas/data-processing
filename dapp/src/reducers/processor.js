import types from '../actions/ActionTypes'
import { createReducer } from '../utils/reducers'

const request = createReducer([], {
  [types.GET_PROCESSOR_SUCCESS]: (state, action) => [...action.payload.data]
})

export default request
