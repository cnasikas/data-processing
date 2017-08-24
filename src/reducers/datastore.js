import { 
  GET_DATA_SUCCESS,
	ADD_DATA_SUCCESS,

} from '../actions/ActionTypes'

export default function contracts(state = [], action) {
	
  const { payload, type } = action;

  switch (type) {

  	case GET_DATA_SUCCESS:
  		return [...payload.data.datastore]

  	case ADD_DATA_SUCCESS:
  		return [{...payload.data}]

    default:
      return state;
  }

}