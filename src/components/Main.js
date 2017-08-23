import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home.js'
import Contracts from '../pages/Contracts.js'
import Requests from '../pages/Requests.js'
import Account from '../pages/Account.js'
import Login from './Login.js'
import NewContract from '../pages/NewContract.js'
import Notifications from '../components/Notifications'
import ContractDetails from '../components/ContractDetails'

export default class Main extends React.Component {

	render() {
    	return (
        <main className="container pt-3">
          <Notifications />
        	<Switch>
              <Route exact path='/' component={Home}/>
              <Route exact path='/contracts' component={Contracts}/>
              <Route path='/requests' component={Requests}/>
              <Route exact path='/account' component={Account}/>
              <Route path='/login' component={Login}/>
              <Route exact path='/contracts/:name/new' component={NewContract}/>
              <Route exact path='/contracts/:id' component={ContractDetails}/>
          </Switch>
        </main> 
    	)
  	}
}