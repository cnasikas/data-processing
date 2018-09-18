import React from 'react'
import { Link } from 'react-router-dom'
import Badge from './Badge.js'
import {formatDate} from '../utils/helpers'

export default class Request extends React.Component {
  render () {
    const processed = this.props.processed
    const proof = false

    const prcType = processed ? 'success' : 'warning'
    const prcMsg = processed ? 'Processed' : 'On hold'

    const prClass = proof ? 'success' : 'warning'
    const prMsg = proof ? 'Proof' : 'No Proof'

    const confirmed = this.props.status === 'confirmed'
    const badgeType = confirmed ? 'success' : 'warning'

    return (
      <article className='list-group-item list-group-item-action flex-column align-items-start request'>
        <Link to={'/requests/' + this.props.id}>
          <div className='d-flex w-100 justify-content-between'>
            <h5 className='mb-1'>Request #{this.props.index + 1}
              <Badge type={prcType} msg={prcMsg} />
              <Badge type={prClass} msg={prMsg} />
              <Badge type={badgeType} msg={this.props.status} />
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
