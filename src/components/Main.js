import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home.js'
import Contracts from '../pages/Contracts.js'
import Requests from '../pages/Requests.js'

export default class Main extends React.Component {

	render() {
    	return (
        <main>
        	<Switch>
              <Route exact path='/' component={Home}/>
              <Route path='/contracts' component={Contracts}/>
              <Route path='/requests' component={Requests}/>
          </Switch>
        </main> 
    	);
  	}
}