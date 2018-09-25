import types from './ActionTypes'
import { buildActions, createBlockchainAction } from '../utils/actions'

const dataToArgs = (data) => {
  return [data.dataset, data.query, data.pubkey]
}

const actions = buildActions({
  getRequests: [types.GET_REQUESTS, 'requests'],
  getRequest: [types.GET_REQUEST, 'requests/:id'],
  addRequest: [types.ADD_REQUEST, 'requests', 'post']
})

const requestProcessing = createBlockchainAction('requestProcessing', actions.addRequest, dataToArgs)

export default {
  requestProcessing,
  ...actions
}
