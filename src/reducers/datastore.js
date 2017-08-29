import { 
  GET_DATA_SUCCESS,
	ADD_DATA_SUCCESS,

} from '../actions/ActionTypes'

export default function datastore(state = [], action) {
	
  const { payload, type } = action;

  switch (type) {

  	case GET_DATA_SUCCESS:
      let datastore = payload.data.datastore || []
  		return [...datastore]

  	case ADD_DATA_SUCCESS:
      let data = payload.data || {}
  		return [{...data}]

    default:
      return state;
  }

}