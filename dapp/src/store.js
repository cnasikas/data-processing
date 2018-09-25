import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import axios from 'axios'
import axiosMiddleware from 'redux-axios-middleware'
import reducers from './reducers/'

import {
  notificationActions
} from './actions'

const addNotification = notificationActions.addNotification

const client = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || 'http://localhost:3001/api',
  responseType: 'json'
})

const loggerMiddleware = createLogger()

const middlewareConfig = {
  returnRejectedPromiseOnError: true,
  interceptors: {
    response: [
      {
        error: ({ getState, dispatch, getSourceAction }, error) => {
          let errorResponse = error.response ? error.response.data.error : error.message
          let msg = error.name + ': ' + errorResponse
          dispatch(addNotification({ type: 'error', message: msg, class: 'danger' }))
          return Promise.reject(error)
        }
      }
    ]
  }
}

const store = createStore(
  reducers,
  applyMiddleware(
    loggerMiddleware,
    thunkMiddleware,
    axiosMiddleware(client, middlewareConfig)
  )
)

export default store
