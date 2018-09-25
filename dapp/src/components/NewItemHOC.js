import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import {
  notificationActions
} from '../actions'

const addNotification = notificationActions.addNotification

export default function withAddItemForm (FormComponent, actions, link, multipart = false) {
  const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ ...actions, addNotification }, dispatch)
  })

  class NewItem extends React.Component {
    constructor () {
      super()
      this.submit = this.submit.bind(this)
    }

    submit (values) {
      this.props.actions.addItem(values).then((response) => {
        let message = <Link to={link.to} >{link.text}</Link>

        this.props.actions.addNotification({ type: 'success', message: message, class: 'success' })
      }).catch(e => console.log(e))
    }

    render () {
      return (
        <FormComponent onSubmit={this.submit} toPass={this.props.toPass} />
      )
    }
  }

  return connect(null, mapDispatchToProps)(NewItem)
}
