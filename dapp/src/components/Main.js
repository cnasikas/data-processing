import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from '../views/Home.js'
import DataStore from '../views/DataStore.js'
import Requests from '../views/Requests.js'
import Processors from '../views/Processors.js'
import Accounts from '../views/Accounts.js'
import Login from './Login.js'
import AddData from '../views/AddData.js'
import AddRequest from '../views/AddRequest.js'
import AddProcessor from '../views/AddProcessor.js'
import Notifications from '../components/Notifications'
import DataDetails from '../components/DataDetails'
import RequestDetails from '../components/RequestDetails'

export default class Main extends React.Component {
  render () {
    return (
      <main className='container pt-3 pb-3'>
        <Notifications />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/datastore' component={DataStore} />
          <Route exact path='/datastore/add' component={AddData} />
          <Route exact path='/datastore/:id' component={DataDetails} />
          <Route exact path='/requests' component={Requests} />
          <Route exact path='/requests/add' component={AddRequest} />
          <Route exact path='/requests/:id' component={RequestDetails} />
          <Route exact path='/processors' component={Processors} />
          <Route exact path='/processors/add' component={AddProcessor} />
          <Route exact path='/account' component={Accounts} />
          <Route path='/login' component={Login} />
        </Switch>
      </main>
    )
  }
}
