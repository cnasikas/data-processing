import types from '../actions/ActionTypes'
import { createSimpleReducer } from '../utils/reducers'

const datastore = createSimpleReducer([], { type: types.GET_DATASTORE_SUCCESS })

export default datastore
