import types from '../actions/ActionTypes'

export default function requests (state = [], action) {
  const { payload, type } = action

  switch (type) {
    case types.GET_PROCESSORS_SUCCESS:
      let processors = payload.data || []
      return [...processors]

    case types.GET_PROCESSOR_SUCCESS:
      let processor = payload.data || {}
      return [{...processor}]

    case types.ADD_PROCESSOR_SUCCESS:
      processor = payload.data || {}
      return [{...processor}]

    default:
      return state
  }
}
