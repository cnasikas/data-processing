import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { removeNotification } from '../actions/ActionCreators'
import Notification from './Notification'

class Notifications extends React.Component {
  render () {
    let notifications = this.props.notifications.map((notif, index) =>
      <Notification key={index} id={index} {...notif} onDismissClick={() => this.props.actions.removeNotification(index)} />
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