import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Badge from './Badge.js'
import { formatDate, getBadgeType, getReguestBadgeInfo } from '../utils/helpers'

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

    const badgeInfo = getReguestBadgeInfo(this.props.request.processed)

    return (
      <article className='card request-details'>
        <h5 className='card-header'>Request details
          <Badge type={getBadgeType(badgeInfo.processStatus)} msg={badgeInfo.processMessage} />
          <Badge type={getBadgeType(this.props.request.status)} msg={this.props.request.status} />
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
