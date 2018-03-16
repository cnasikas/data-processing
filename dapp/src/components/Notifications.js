import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import shortid from 'shortid'

import { removeNotification } from '../actions/ActionCreators'
import Notification from './Notification'

class Notifications extends React.Component {
  generateKey (pre) {
    return shortid.generate()
  }

  render () {
    if (!this.props.notifications || this.props.notifications.length === 0) {
      return null
    }

    let notifications = this.props.notifications.map((notif, index) =>
      <Notification key={this.generateKey(index)} {...notif} onDismissClick={() => this.props.actions.removeNotification(index)} />
    )

    return (
      <div className='notifications'>{notifications}</div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ removeNotification }, dispatch)
})

const mapStateToProps = state => ({
  notifications: state.notifications
})

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)
