import types from '../actions/ActionTypes'

export default function account (state = {}, action) {
  const { payload, type } = action

  switch (type) {
    case types.GET_ACCOUNTS_SUCCESS:
      return {...payload.data}
    case types.SET_DEFAULT_ACCOUNT_SUCCESS:
      return {...payload.data}

    default:
      return state
  }
}
