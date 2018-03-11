import React from 'react'
import { Link } from 'react-router-dom'

export default class Processor extends React.Component {
  render () {
    return (
      <article className='list-group-item list-group-item-action flex-column align-items-start processor'>
        <Link to={'/processor/' + this.props._id}>
          <div className='d-flex w-100 justify-content-between'>
            <h5 className='mb-1'>Processor #{this.props.index}</h5>
            <small>{this.props.date}</small>
          </div>
          <p className='mb-1'><b>Name:</b> {this.props.name}</p>
          <p className='mb-1'><b>Public key:</b> {this.props.pubKey}</p>
          <small><b>Address:</b> {this.props.account}</small>
        </Link>
      </article>
    )
  }
}
