import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './Login.js'

import Home from '../pages/Home.js'
import Contracts from '../pages/Contracts.js'
import Requests from '../pages/Requests.js'

export default class Main extends React.Component {

	render() {
    	return (
        <main className="container">
        	<Switch>
              <Route exact path='/' component={Home}/>
              <Route path='/contracts' component={Contracts}/>
              <Route path='/requests' component={Requests}/>
              <Route path='/login' component={Login}/>
          </Switch>
        </main> 
    	)
  	}
}