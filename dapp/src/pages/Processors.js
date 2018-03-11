import React from 'react'
import withList from '../components/ListHOC'
import Processor from '../components/Processor'
import { getProcessors } from '../actions/ActionCreators'

const Processors = withList(Processor, 'processors', {getList: getProcessors}, 'Register Processor')

export default class ProcessorsPage extends React.Component {
  render () {
    return (
      <Processors />
    )
  }
}
