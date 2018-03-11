import {
  GET_PROCESSORS_SUCCESS,
  GET_PROCESSOR_SUCCESS,
  ADD_PROCESSOR_SUCCESS

} from '../actions/ActionTypes'

export default function requests (state = [], action) {
  const { payload, type } = action

  switch (type) {
    case GET_PROCESSORS_SUCCESS:
      let processors = payload.data || []
      return [...processors]

    case GET_PROCESSOR_SUCCESS:
      let processor = payload.data || {}
      return [{...processor}]

    case ADD_PROCESSOR_SUCCESS:
      processor = payload.data || {}
      return [{...processor}]

    default:
      return state
  }
}
