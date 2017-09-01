import {
  GET_REQUESTS_SUCCESS,
  ADD_REQUEST_SUCCESS

} from '../actions/ActionTypes'

export default function datastore (state = [], action) {
  const { payload, type } = action

  switch (type) {
    case GET_REQUESTS_SUCCESS:
      let datastore = payload.data.requests || []
      return [...datastore]

    case ADD_REQUEST_SUCCESS:
      let data = payload.data || {}
      return [{...data}]

    default:
      return state
  }
}
