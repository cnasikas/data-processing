import React from 'react'
import withList from '../components/ListHOC'
import Controller from '../components/Controller'

import '../css/Entities.css'

import {
  controllerActions
} from '../actions'

const getControllers = controllerActions.getControllers

const Controllers = withList(Controller, 'controllers', { getList: getControllers }, 'Register Controller')

export default class ControllersPage extends React.Component {
  render () {
    return (
      <Controllers />
    )
  }
}
