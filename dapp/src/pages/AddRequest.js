import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import withReduxForm from '../components/ReduxFormHOC'
import withNewItem from '../components/NewItemHOC'

import { getDataStore, addRequest } from '../actions/ActionCreators'
import AddRequestFormFields from '../components/AddRequestForm'

const RequestForm = withReduxForm(AddRequestFormFields, 'add-request')
const AddRequestForm = withNewItem(RequestForm, {addItem: addRequest}, {to: '/requests/', text: 'Request successuflly added. Return to requests'})

class AddRequestPage extends React.Component {
  componentDidMount () {
    this.props.actions.getDataStore().catch(e => console.log(e))
  }

  render () {
    let toPass = {datastore: this.props.datastore}
    return (
      <div>
        <AddRequestForm toPass={toPass} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  datastore: state.datastore
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ getDataStore }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AddRequestPage)
