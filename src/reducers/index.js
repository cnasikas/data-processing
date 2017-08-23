import { combineReducers } from "redux"
import { reducer as formReducer } from 'redux-form'
import notifications from "./notifications"
import contracts from "./contracts"
import account from "./account"

export default combineReducers({
  notifications,
  contracts,
  account,
  form: formReducer
});