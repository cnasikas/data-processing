import React from 'react'
import withReduxForm from '../components/ReduxFormHOC'
import withNewItem from '../components/NewItemHOC'

import AddProcessorFormFields from '../components/AddProcessorForm'

import {
  processorActions
} from '../actions'

const addProcessor = processorActions.addProcessor

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
