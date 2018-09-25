import types from '../actions/ActionTypes'
import { createReducer } from '../utils/reducers'

const dataset = createReducer([], {
  [types.GET_DATA_SUCCESS]: (state, action) => [...action.payload.data]
})

export default dataset
