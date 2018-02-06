import {
  GET_REQUESTS_SUCCESS,
  GET_REQUEST_SUCCESS,
  ADD_REQUEST_SUCCESS

} from '../actions/ActionTypes'

export default function requests (state = [], action) {
  const { payload, type } = action

  switch (type) {
    case GET_REQUESTS_SUCCESS:
      let requests = payload.data || []
      return [...requests]

    case GET_REQUEST_SUCCESS:
      let request = payload.data || {}
      return [{...request}]

    case ADD_REQUEST_SUCCESS:
      request = payload.data || {}
      return [{...request}]

    default:
      return state
  }
}
