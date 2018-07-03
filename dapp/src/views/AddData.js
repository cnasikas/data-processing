import React from 'react'
import withReduxForm from '../components/ReduxFormHOC'
import withNewItem from '../components/NewItemHOC'

import AddDataFormFields from '../components/AddDataForm'

import {
  datastoreActions
} from '../actions'

const registerDataset = datastoreActions.registerDataset

const DataForm = withReduxForm(AddDataFormFields, 'add-data')
const AddDataForm = withNewItem(DataForm, {addItem: registerDataset}, {to: '/datastore/', text: 'Data successuflly added. Return to Data Store'}, true)

export default class AddData extends React.Component {
  render () {
    return (
      <div>
        <AddDataForm />
      </div>
    )
  }
}
