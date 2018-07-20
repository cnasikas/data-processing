import React from 'react'
import withList from '../components/ListHOC'
import Processor from '../components/Processor'

import '../css/Processors.css'

import {
  processorActions
} from '../actions'

const getProcessors = processorActions.getProcessors

const Processors = withList(Processor, 'processors', {getList: getProcessors}, 'Register Processor')

export default class ProcessorsPage extends React.Component {
  render () {
    return (
      <Processors />
    )
  }
}
