import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from '../pages/Home.js'
import DataStore from '../pages/DataStore.js'
import Requests from '../pages/Requests.js'
import Processors from '../pages/Processors.js'
import Accounts from '../pages/Accounts.js'
import Login from './Login.js'
import AddData from '../pages/AddData.js'
import AddRequest from '../pages/AddRequest.js'
import AddProcessor from '../pages/AddProcessor.js'
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
