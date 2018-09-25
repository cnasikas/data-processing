import types from './ActionTypes'
import { buildActions } from '../utils/actions'

const actions = buildActions({
  addNotification: types.ADD_NOTIFICATION,
  removeNotification: types.REMOVE_NOTIFICATION
})

export default actions
