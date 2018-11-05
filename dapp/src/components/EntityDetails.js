import React from 'react'
import Badge from './Badge.js'

import config from '../config.json'
import { formatDate, getBadgeType } from '../utils/helpers'

export default class EntityDetails extends React.Component {
  render () {
    if (!this.props[this.key]) {
      return null
    }

    return (
      <article className='card data-details border-secondary mb-3'>
        <h5 className='card-header'>
          <span>{this.title} details</span>
          <Badge type={getBadgeType(this.props[this.key].status)} msg={this.props[this.key].status} />
        </h5>
        <div className='card-body'>
          <h5 className='card-title'>Name: {this.props[this.key].name}</h5>
        </div>
        <div className='card-body'>
          <h6 className='card-subtitle mb-2'>Public key:
            <span className='text-muted'> {this.props[this.key].pubkey}</span>
          </h6>
          <h6 className='card-subtitle mb-2'>Address:
            <span className='text-muted'> {this.props[this.key].address}</span>
          </h6>
          <h6 className='card-subtitle mb-2'>Tx:
            <a href={`${config.etherscan}/tx/${this.props[this.key].tx_id}`} target='_blank'>
              <span> {this.props[this.key].tx_id}</span>
            </a>
          </h6>
        </div>
        <div className='card-footer text-muted'>
          Created at: {formatDate(this.props.createdAt)}
        </div>
      </article>
    )
  }
}
