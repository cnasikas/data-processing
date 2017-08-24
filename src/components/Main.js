import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home.js'
import DataStore from '../pages/DataStore.js'
import Requests from '../pages/Requests.js'
import Account from '../pages/Account.js'
import Login from './Login.js'
import AddData from '../pages/AddData.js'
import Notifications from '../components/Notifications'

export default class Main extends React.Component {

	render() {
    	return (
        <main className="container pt-3">
          <Notifications />
        	<Switch>
              <Route exact path='/' component={Home}/>
              <Route exact path='/datastore' component={DataStore}/>
              <Route path='/requests' component={Requests}/>
              <Route exact path='/account' component={Account}/>
              <Route path='/login' component={Login}/>
              <Route exact path='/datastore/add' component={AddData}/>
          </Switch>
        </main> 
    	)
  	}
}