import React from 'react'
import { Link } from 'react-router-dom'
import Badge from './Badge.js'
import {formatDate} from '../utils/helpers'

export default class Request extends React.Component {
  render () {
    let processed = this.props.processed
    let proof = false

    let prcType = processed ? 'success' : 'warning'
    let prcMsg = processed ? 'Processed' : 'On hold'

    let prClass = proof ? 'success' : 'warning'
    let prMsg = proof ? 'Proof' : 'No Proof'

    return (
      <article className='list-group-item list-group-item-action flex-column align-items-start request'>
        <Link to={'/requests/' + this.props.id}>
          <div className='d-flex w-100 justify-content-between'>
            <h5 className='mb-1'>Request #{this.props.index + 1}
              <Badge type={prcType} msg={prcMsg} />
              <Badge type={prClass} msg={prMsg} />
            </h5>
            <small>{formatDate(this.props.createdAt)}</small>
          </div>
          <p className='mb-1'>
            Data set: {this.props.dataset}
          </p>
          <small>By: {this.props.owner}</small>
        </Link>
      </article>
    )
  }
}
