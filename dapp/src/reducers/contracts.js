import types from '../actions/ActionTypes'
import {createSimpleReducer} from '../utils/reducers'

const contracts = createSimpleReducer([], {type: types.GET_CONTRACT_TYPES_SUCCESS})

export default contracts
