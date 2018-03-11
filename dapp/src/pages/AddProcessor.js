import React from 'react'
import withReduxForm from '../components/ReduxFormHOC'
import withNewItem from '../components/NewItemHOC'

import { addProcessor } from '../actions/ActionCreators'
import AddProcessorFormFields from '../components/AddProcessorForm'

const ProcessorForm = withReduxForm(AddProcessorFormFields, 'add-processor')
const AddProcessorForm = withNewItem(ProcessorForm, {addItem: addProcessor}, {to: '/processors/', text: 'Processor successuflly added. Return to processors'})

export default class AddProcessor extends React.Component {
  render () {
    return (
      <div>
        <AddProcessorForm />
      </div>
    )
  }
}
