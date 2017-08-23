import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers/'

import { addNotification } from "./actions/ActionCreators";

const middlewareConfig = {
  returnRejectedPromiseOnError: true,
    interceptors: {
        response: [
          {
            error: ({getState, dispatch, getSourceAction}, error) => {
              let msg = error.message + ": " + error.response.data.error
            	dispatch(addNotification({type: 'error', message: msg, class: 'danger'}))
            	return Promise.reject(error)
            }
          }
        ]
      }
  };

const client = axios.create({
  baseURL:'http://localhost:3001/api',
  responseType: 'json'
})

let store = createStore(
	reducers,
	applyMiddleware(axiosMiddleware(client, middlewareConfig)) /* BUG on ERR_NET_FAILURE */
)

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
	,
	document.getElementById('app')
);

registerServiceWorker();
