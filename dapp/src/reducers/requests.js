import types from '../actions/ActionTypes'

export default function requests (state = [], action) {
  const { payload, type } = action

  switch (type) {
    case types.GET_REQUESTS_SUCCESS:
      let requests = payload.data || []
      return [...requests]

    case types.GET_REQUEST_SUCCESS:
      let request = payload.data || {}
      return [...request]

    case types.ADD_REQUEST_SUCCESS:
      request = payload.data || {}
      return [{...request}]

    default:
      return state
  }
}
