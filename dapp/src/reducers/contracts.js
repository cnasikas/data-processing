import {
  GET_CONTRACT_TYPES_SUCCESS
} from '../actions/ActionTypes'

export default function contracts (state = [], action) {
  const { payload, type } = action
  switch (type) {
    case GET_CONTRACT_TYPES_SUCCESS:
      return [...payload.data.types]

    default:
      return state
  }
}
