import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Badge from './Badge.js'
import { formatDate } from '../utils/helpers'

import {
  requestActions
} from '../actions'

const getRequest = requestActions.getRequest

class RequestDetails extends React.Component {
  componentDidMount () {
    this.props.actions.getRequest({ id: this.props.match.params.id }).catch(e => console.log(e))
  }

  render () {
    if (!this.props.request) {
      return null
    }

    const processed = this.props.request.processed
    const proof = this.props.request.proof

    const prcType = processed ? 'success' : 'warning'
    const prcMsg = processed ? 'Processed' : 'On hold'

    const prClass = proof ? 'success' : 'warning'
    const prMsg = proof ? 'Proof' : 'No proof'

    const confirmed = this.props.request.status === 'confirmed'
    const badgeType = confirmed ? 'success' : 'warning'

    return (
      <article className='card request-details'>
        <h5 className='card-header'>Request details
          <Badge type={prcType} msg={prcMsg} />
          <Badge type={prClass} msg={prMsg} />
          <Badge type={badgeType} msg={this.props.request.status} />
        </h5>
        <div className='card-body'>
          <h5 className='card-title'>Data set: {this.props.request.dataset}</h5>
          <h6 className='card-subtitle mb-2'>Tx:
            <span className='text-muted'> {this.props.request.tx_id}</span>
          </h6>
          <h6 className='card-subtitle mb-2'>Requestor:
            <span className='text-muted'> {this.props.request.requestor}</span>
          </h6>
          <h6 className='card-subtitle mb-2'>Response public key:
            <span className='text-muted'> {this.props.request.pubkey}</span>
          </h6>
        </div>
        <div className='card-footer text-muted'>
          Created at: {formatDate(this.props.createdAt)}
        </div>
      </article>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ getRequest }, dispatch)
})

const mapStateToProps = state => ({
  request: state.request[0]
})

export default connect(mapStateToProps, mapDispatchToProps)(RequestDetails)
