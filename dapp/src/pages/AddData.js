import React from 'react'
import withReduxForm from '../components/ReduxFormHOC'
import withNewItem from '../components/NewItemHOC'

import { addData } from '../actions/ActionCreators'
import AddDataFormFields from '../components/AddDataForm'

const DataForm = withReduxForm(AddDataFormFields, 'add-data')
const AddDataForm = withNewItem(DataForm, {addItem: addData}, {to: '/datastore/', text: 'Data successuflly added. Return to Data Store'})

export default class AddData extends React.Component {
  render () {
    return (
      <div>
        <AddDataForm />
      </div>
    )
  }
}
