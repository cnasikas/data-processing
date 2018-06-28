import types from './ActionTypes'
import {buildActions} from '../utils/actions'

const actions = buildActions({
  getAccounts: [types.GET_ACCOUNTS, 'accounts'],
  getAccount: [types.GET_ACCOUNT, 'accounts/:id'],
  setDefaultAccount: [types.SET_DEFAULT_ACCOUNT, 'accounts', 'post']
})

export default actions
