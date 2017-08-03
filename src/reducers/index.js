import { combineReducers } from "redux"
import { reducer as formReducer } from 'redux-form'
import notifications from "./notifications"
import contracts from "./contracts"

export default combineReducers({
  notifications,
  contracts,
  form: formReducer
});