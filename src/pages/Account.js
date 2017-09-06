import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { getAccount, setDefaultAccount } from '../actions/ActionCreators'

class Account extends React.Component {
  constructor (props) {
    super(props)
    this.setDefaultAccount = this.setDefaultAccount.bind(this)
  }

  componentDidMount () {
    this.props.actions.getAccount().catch(e => console.error(e))
  }

  setDefaultAccount () {
    this.props.actions.setDefaultAccount().catch(e => console.error(e))
  }

  render () {
    console.log(this.props)
    return (
      <section id='account'>
        <div className='card border-dark text-dark mb-3'>
          <div className='card-header'>
            Account Details
          </div>
          <div className='card-body'>
            <ul className='list-group list-group-flush'>
              <li className='list-group-item'>Address: {this.props.account.address}</li>
              <li className='list-group-item'>Balance: {this.props.account.balance}</li>
            </ul>
          </div>
        </div>
        <ul className='nav button-nav'>
          <li className='nav-item'>
            <button className='nav-link btn btn-primary' onClick={this.setDefaultAccount}>
              Set to default account
            </button>
          </li>
        </ul>
      </section>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ getAccount, setDefaultAccount }, dispatch)
})

const mapStateToProps = state => ({
  account: state.account,
  ecc: state.ecc
})

export default connect(mapStateToProps, mapDispatchToProps)(Account)
