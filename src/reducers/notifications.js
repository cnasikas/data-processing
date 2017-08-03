import { ADD_NOTIFICATION } from '../actions/ActionTypes'

export default function notifications(state = [], action) {
	
  const { payload, type } = action;

  switch (type) {

  	case ADD_NOTIFICATION:
  		return [payload, ...state]

    default:
      return state;
  }

}