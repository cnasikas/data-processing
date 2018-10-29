import React from 'react'
import { Link } from 'react-router-dom'
import Badge from './Badge.js'

export default class Controller extends React.Component {
  render () {
    const confirmed = this.props.status === 'confirmed'
    const badgeType = confirmed ? 'success' : 'warning'
    return (
      <article className='list-group-item list-group-item-action flex-column align-items-start controller'>
        <Link to={'/controller/' + this.props.id}>
          <div className='d-flex w-100 justify-content-between'>
            <h5 className='mb-1'>Controller #{this.props.index + 1}
              <Badge type={badgeType} msg={this.props.status} />
            </h5>
            <small>{this.props.date}</small>
          </div>
          <p className='mb-1'><b>Name:</b> {this.props.name}</p>
          <p className='mb-1'><b>Public key:</b> {this.props.pubkey}</p>
          <small><b>Address:</b> {this.props.address}</small>
        </Link>
      </article>
    )
  }
}
