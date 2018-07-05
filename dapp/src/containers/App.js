import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AppHeader from '../components/Header'
import AppMain from '../components/Main'
import AppFooter from '../components/Footer'

import {
  contractActions
} from '../actions'

import '../css/App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap' // js libraries

const getContracts = contractActions.getContracts

class App extends React.Component {
  componentDidMount () {
    this.props.actions.getContracts().catch(e => console.log(e))
  }

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

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ getContracts }, dispatch)
})

const mapStateToProps = state => ({
  contracts: state.contracts
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
