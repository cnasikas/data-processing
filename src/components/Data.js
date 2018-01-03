import React from 'react'
import { Link } from 'react-router-dom'

export default class Data extends React.Component {
  render () {
    return (
      <article className='list-group-item mb-3 data'>
        <Link to={'datastore/' + this.props._id}>
          <div className='d-flex w-100 justify-content-between'>
            <h5 className='mb-1'>Data #{this.props.index}</h5>
            <small>{this.props.date}</small>
          </div>
          <p className='mb-1'><b>At:</b> {this.props.hash_ptr}</p>
          <small><b>By:</b> {this.props.account}</small>
        </Link>
      </article>
    )
  }
}
