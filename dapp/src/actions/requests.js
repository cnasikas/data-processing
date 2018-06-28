import types from './ActionTypes'
import {buildActions} from '../utils/actions'

const actions = buildActions({
  getRequests: [types.GET_REQUESTS, 'requests'],
  getRequest: [types.GET_REQUEST, 'requests/:id'],
  addRequest: [types.ADD_REQUEST, 'requests', 'post']
})

export default actions
