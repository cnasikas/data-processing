import React from 'react'
import withReduxForm from '../components/ReduxFormHOC'
import withNewItem from '../components/NewItemHOC'

import AddDataFormFields from '../components/AddDataForm'

import {
  datastoreActions
} from '../actions'

const addData = datastoreActions.addData

const DataForm = withReduxForm(AddDataFormFields, 'add-data')
const AddDataForm = withNewItem(DataForm, {addItem: addData}, {to: '/datastore/', text: 'Data successuflly added. Return to Data Store'}, true)

export default class AddData extends React.Component {
  render () {
    return (
      <div>
        <AddDataForm />
      </div>
    )
  }
}
