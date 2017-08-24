import { combineReducers } from "redux"
import { reducer as formReducer } from 'redux-form'
import notifications from "./notifications"
import contracts from "./contracts"
import datastore from "./datastore"
import account from "./account"

export default combineReducers({
  notifications,
  datastore,
  contracts,
  account,
  form: formReducer
});