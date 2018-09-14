import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import notifications from './notifications'
import contracts from './contracts'
import datastore from './datastore'
import dataset from './dataset'
import requests from './requests'
import request from './request'
import account from './account'
import processors from './processors'
import controllers from './controllers'

export default combineReducers({
  notifications,
  dataset,
  datastore,
  contracts,
  requests,
  request,
  account,
  processors,
  controllers,
  form: formReducer
})
