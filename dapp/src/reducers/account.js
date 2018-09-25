import types from '../actions/ActionTypes'
import { createSimpleReducer } from '../utils/reducers'

const account = createSimpleReducer([], { type: types.GET_ACCOUNTS_SUCCESS })

export default account
