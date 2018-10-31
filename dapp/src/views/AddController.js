import React from 'react'
import withReduxForm from '../components/ReduxFormHOC'
import withNewItem from '../components/NewItemHOC'

import AddEntityFormFields from '../components/AddEntityForm'

import {
  controllerActions
} from '../actions'

const registerController = controllerActions.registerController

const ControllerForm = withReduxForm(AddEntityFormFields, 'add-controller')
const AddControllerForm = withNewItem(ControllerForm, { addItem: registerController }, { to: '/controllers/', text: 'Controller successuflly added. Return to controllers' })

export default class AddController extends React.Component {
  render () {
    return (
      <div>
        <AddControllerForm />
      </div>
    )
  }
}
