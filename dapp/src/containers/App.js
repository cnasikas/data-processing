import React from 'react'
import { connect } from 'react-redux'
import AppHeader from '../components/Header'
import AppMain from '../components/Main'
import AppFooter from '../components/Footer'

import '../css/App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap' // js libraries

class App extends React.Component {
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

const mapStateToProps = state => ({
  contracts: state.contracts
})

export default connect(mapStateToProps, null)(App)
