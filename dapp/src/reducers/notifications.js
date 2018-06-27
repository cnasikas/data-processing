import types from '../actions/ActionTypes'

export default function notifications (state = [], action) {
  const { payload, type } = action

  switch (type) {
    case types.ADD_NOTIFICATION:
      return [payload, ...state]

    case types.REMOVE_NOTIFICATION:
      return []
      //return state.filter((notification, index) => index !== payload)

    default:
      return state
  }
}
