import React from 'react'
import { Link } from 'react-router-dom'
import Badge from './Badge.js'

export default class Request extends React.Component {
  render () {
    let processed = this.props.data.processed
    let proof = this.props.data.proof

    let prcType = processed ? 'success' : 'warning'
    let prcMsg = processed ? 'Processed' : 'On hold'

    let prClass = proof ? 'success' : 'warning'
    let prMsg = proof ? 'Proof' : 'No Proof'

    return (
      <article className='list-group-item list-group-item-action flex-column align-items-start request'>
        <Link to={'/requests/' + this.props._id}>
          <div className='d-flex w-100 justify-content-between'>
            <h5 className='mb-1'>Request #{this.props.id + 1}
              <Badge type={prcType} msg={prcMsg} />
              <Badge type={prClass} msg={prMsg} />
            </h5>
            <small>{this.props.date}</small>
          </div>
          <p className='mb-1'>
            Data set: {this.props.data}
          </p>
          <small>Requestor: {this.props.account}</small>
        </Link>
      </article>
    )
  }
}
