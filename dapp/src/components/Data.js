import React from 'react'
import { Link } from 'react-router-dom'
import {formatDate} from '../utils/helpers'

export default class Data extends React.Component {
  render () {
    return (
      <article className='list-group-item list-group-item-action flex-column align-items-start data'>
        <Link to={'/datastore/' + this.props.hash}>
          <div className='d-flex w-100 justify-content-between'>
            <h5 className='mb-1'>Data #{this.props.index + 1}</h5>
            <small>{formatDate(this.props.createdAt)}</small>
          </div>
          <p className='mb-1'><b>Name:</b> {this.props.name}</p>
          <p className='mb-1'><b>Location:</b> {this.props.location}</p>
          <p className='mb-1'><b>Category:</b> {this.props.category}</p>
          <small><b>Owner:</b> {this.props.owner}</small>
        </Link>
      </article>
    )
  }
}
