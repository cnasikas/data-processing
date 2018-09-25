import types from './ActionTypes'
import { buildActions, createBlockchainAction } from '../utils/actions'

const dataToArgs = (data) => {
  return [data.name, data.pubkey]
}

const actions = buildActions({
  getControllers: [types.GET_CONTROLLERS, 'controllers'],
  getController: [types.GET_CONTROLLER, 'controllers/:id'],
  addController: [types.ADD_CONTROLLER, 'controllers', 'post']
})

const registerController = createBlockchainAction('registerController', actions.addController, dataToArgs)

export default {
  registerController,
  ...actions
}
