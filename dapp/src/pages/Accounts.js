import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Account from '../components/Account.js'
import { getAccounts, setDefaultAccount } from '../actions/ActionCreators'

class Accounts extends React.Component {
  constructor (props) {
    super(props)
    this.setDefaultAccount = this.setDefaultAccount.bind(this)
  }

  componentDidMount () {
    this.props.actions.getAccounts().catch(e => console.error(e))
  }

  setDefaultAccount () {
    this.props.actions.setDefaultAccount().catch(e => console.error(e))
  }

  render () {
    if (!('default' in this.props.accounts && 'accounts' in this.props.accounts)) {
      return null
    }

    let accounts = ''
    if (this.props.accounts.accounts.length > 0) {
      accounts = this.props.accounts.accounts.map((account, index) => {
        return <Account address={account} key={index} index={index + 1} />
      })
    }

    console.log(accounts)
    return (
      <section id='account'>
        <div className='card border-dark text-dark mb-3'>
          <div className='card-header'>
            Default account
          </div>
          <div className='card-body'>
            <ul className='list-group list-group-flush'>
              <li className='list-group-item'>Address: {this.props.accounts.default.address}</li>
              <li className='list-group-item'>Balance: {this.props.accounts.default.balance}</li>
            </ul>
          </div>
        </div>
        <ul className='list-group' >
          {accounts}
        </ul>
      </section>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ getAccounts, setDefaultAccount }, dispatch)
})

const mapStateToProps = state => ({
  accounts: state.account // the reducer file name
})

export default connect(mapStateToProps, mapDispatchToProps)(Accounts)
