import React from 'react'
import withReduxForm from '../components/ReduxFormHOC'
import withNewItem from '../components/NewItemHOC'

import AddEntityFormFields from '../components/AddEntityForm'

import {
  processorActions
} from '../actions'

const registerProcessor = processorActions.registerProcessor

const ProcessorForm = withReduxForm(AddEntityFormFields, 'add-processor')
const AddProcessorForm = withNewItem(ProcessorForm, { addItem: registerProcessor }, { to: '/processors/', text: 'Processor successuflly added. Return to processors' })

export default class AddProcessor extends React.Component {
  render () {
    return (
      <div>
        <AddProcessorForm />
      </div>
    )
  }
}
