import React from 'react'
import withList from '../components/ListHOC'
import Entity from '../components/Entity'

import '../css/Entities.css'

import {
  processorActions
} from '../actions'

const getProcessors = processorActions.getProcessors
const options = { buttonTxt: 'Register Processor', title: 'Processor' }

const Processors = withList(Entity, 'processors', { getList: getProcessors }, { ...options })

export default class ProcessorsPage extends React.Component {
  render () {
    return (
      <Processors />
    )
  }
}
