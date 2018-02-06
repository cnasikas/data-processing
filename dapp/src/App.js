import React from 'react'
import AppHeader from './components/Header'
import AppMain from './components/Main'
import AppFooter from './components/Footer'

import './css/App.css'
import 'bootstrap/dist/css/bootstrap.css'

export default class App extends React.Component {
  render () {
    return (
      <div className='app-wrapper'>
        <AppHeader className='app-header' />
        <AppMain className='app-main' />
        <AppFooter className='app-footer' />
      </div>
    )
  }
}
