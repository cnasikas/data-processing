import {
  GET_ACCOUNT_SUCCESS,
  SET_DEFAULT_ACCOUNT_SUCCESS
} from '../actions/ActionTypes'

export default function account (state = {}, action) {
  const { payload, type } = action

  switch (type) {
    case GET_ACCOUNT_SUCCESS:
      return {...payload.data}
    case SET_DEFAULT_ACCOUNT_SUCCESS:
      return {...payload.data}

    default:
      return state
  }
}
