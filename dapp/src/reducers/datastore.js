import types from '../actions/ActionTypes'

export default function datastore (state = [], action) {
  const { payload, type } = action
  let data = {}

  switch (type) {
    case types.GET_DATASTORE_SUCCESS:
      let datastore = payload.data || []
      return [...datastore]

    case types.GET_DATA_SUCCESS:
      data = payload.data || {}
      return [{...data}]

    case types.ADD_DATA_SUCCESS:
      data = payload.data || {}
      return [{...data}]

    default:
      return state
  }
}
