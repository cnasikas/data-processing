import React from 'react'
import { Link } from 'react-router-dom'
import Badge from './Badge.js'
import { formatDate, getBadgeType, getReguestBadgeInfo } from '../utils/helpers'

export default class Request extends React.Component {
  render () {
    const badgeInfo = getReguestBadgeInfo(this.props.processed)

    return (
      <article className='list-group-item list-group-item-action flex-column align-items-start request'>
        <Link to={'/requests/' + this.props.id}>
          <div className='d-flex w-100 justify-content-between'>
            <h5 className='mb-1'>Request #{this.props.index + 1}
              <Badge type={getBadgeType(badgeInfo.processStatus)} msg={badgeInfo.processMessage} />
              <Badge type={getBadgeType(this.props.status)} msg={this.props.status} />
            </h5>
            <small>{formatDate(this.props.createdAt)}</small>
          </div>
          <p className='mb-1'>
            Data set: {this.props.dataset}
          </p>
          <small>By: {this.props.requestor}</small>
        </Link>
      </article>
    )
  }
}
