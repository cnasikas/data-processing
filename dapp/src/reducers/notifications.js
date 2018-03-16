import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from '../actions/ActionTypes'

export default function notifications (state = [], action) {
  const { payload, type } = action

  switch (type) {
    case ADD_NOTIFICATION:
      return [payload, ...state]

    case REMOVE_NOTIFICATION:
      return []
      //return state.filter((notification, index) => index !== payload)

    default:
      return state
  }
}
