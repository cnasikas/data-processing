import types from './ActionTypes'
import {buildActions} from '../utils/actions'

const actions = buildActions({
  getContractTypes: [types.GET_CONTRACT_TYPES, 'contracts']
})

export default actions
