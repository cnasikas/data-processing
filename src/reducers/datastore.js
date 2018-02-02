import {
  GET_DATASTORE_SUCCESS,
  GET_DATA_SUCCESS,
  ADD_DATA_SUCCESS

} from '../actions/ActionTypes'

export default function datastore (state = [], action) {
  const { payload, type } = action
  let data = {}

  switch (type) {
    case GET_DATASTORE_SUCCESS:
      let datastore = payload.data || []
      return [...datastore]

    case GET_DATA_SUCCESS:
      data = payload.data || {}
      return [{...data}]

    case ADD_DATA_SUCCESS:
      data = payload.data || {}
      return [{...data}]

    default:
      return state
  }
}
