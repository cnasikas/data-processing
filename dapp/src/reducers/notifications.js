import types from '../actions/ActionTypes'
import { createReducer } from '../utils/reducers'

const notifications = createReducer([], {
  [types.ADD_NOTIFICATION]: (state, action) => [...state, action.payload],
  [types.REMOVE_NOTIFICATION]: (state, action) => []
})

export default notifications
