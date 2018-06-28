import types from './ActionTypes'
import {buildActions} from '../utils/actions'

const actions = buildActions({
  getContracts: [types.GET_CONTRACTS, 'contracts']
})

export default actions
