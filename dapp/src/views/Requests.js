import React from 'react'
import withList from '../components/ListHOC'
import Request from '../components/Request.js'

import '../css/Requests.css'

import {
  requestActions
} from '../actions'

const getRequests = requestActions.getRequests
const options = { buttonTxt: 'Request for processing' }

const Requests = withList(Request, 'requests', { getList: getRequests }, { ...options })

export default class RequestPage extends React.Component {
  render () {
    return (
      <Requests />
    )
  }
}
