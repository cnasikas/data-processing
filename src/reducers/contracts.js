import { 
	GET_CONTRACT_TYPES_SUCCESS,
	GET_CONTRACTS_SUCCESS,
  NEW_CONTRACT_SUCCESS
} from '../actions/ActionTypes'

export default function contracts(state = [], action) {
	
  const { payload, type } = action;

  switch (type) {

  	case GET_CONTRACT_TYPES_SUCCESS:
  		return [...payload.data.types]

  	case GET_CONTRACTS_SUCCESS:
  		return [...payload.data.contracts]

    case NEW_CONTRACT_SUCCESS:
      return [{...payload.data}]

    default:
      return state;
  }

}