import { ADD_TO_CART } from '../constants/ActionTypes'

export default function notifications(state = [], action) {
	
  const { payload, type } = action;

  switch (type) {

    default:
      return state;
  }

}