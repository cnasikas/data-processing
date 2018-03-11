import React from 'react'
import withList from '../components/ListHOC'
import { getRequests } from '../actions/ActionCreators'
import Request from '../components/Request.js'

import '../css/Requests.css'

const Requests = withList(Request, 'requests', {getList: getRequests}, 'Request for processing')

export default class RequestPage extends React.Component {
  render () {
    return (
      <Requests />
    )
  }
}
