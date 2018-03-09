import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { addRequest, addNotification, getDataStore } from '../actions/ActionCreators'
import AddRequestForm from '../components/AddRequestForm'

class AddRequest extends React.Component {
  componentDidMount () {
    this.props.actions.getDataStore().catch(e => console.log(e))
    this.submit = this.submit.bind(this)
  }

  submit (values) {
    this.props.actions.addRequest(values).then((response) => {
      let message = <Link to={'/requests/'} >{'Request successuflly added. Return to requests'}</Link>

      this.props.actions.addNotification({type: 'success', message: message, class: 'success'})
    }).catch(e => console.log(e))
  }

  render () {
    return (
      <div>
        <AddRequestForm onSubmit={this.submit} datastore={this.props.datastore} />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ addRequest, addNotification, getDataStore }, dispatch)
})

const mapStateToProps = state => ({
  request: state.requests,
  datastore: state.datastore
})

export default connect(mapStateToProps, mapDispatchToProps)(AddRequest)
