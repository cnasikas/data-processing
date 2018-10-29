import React from 'react'
import withList from '../components/ListHOC'
import Entity from '../components/Entity'

import '../css/Entities.css'

import {
  controllerActions
} from '../actions'

const getControllers = controllerActions.getControllers
const options = { buttonTxt: 'Register Controller', title: 'Controller' }

const Controllers = withList(Entity, 'controllers', { getList: getControllers }, { ...options })

export default class ControllersPage extends React.Component {
  render () {
    return (
      <Controllers />
    )
  }
}
