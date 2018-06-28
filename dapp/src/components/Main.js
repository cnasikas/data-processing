import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Notifications from '../components/Notifications'
import appRoutes from '../routes/app.js'

const switchRoutes = (
  <Switch>
    {appRoutes.map((prop, key) => {
      if (prop.redirect) {
        return <Redirect from={prop.path} to={prop.to} key={key} />
      }
      return <Route path={prop.path} component={prop.component} key={key} exact />
    })}
  </Switch>
)

export default class Main extends React.Component {
  render () {
    return (
      <main className='container pt-3 pb-3'>
        <Notifications />
        <Switch>
          {switchRoutes}
        </Switch>
      </main>
    )
  }
}
