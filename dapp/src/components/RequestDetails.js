import React from 'react'
import moment from 'moment'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getRequest } from '../actions/ActionCreators'
import Badge from './Badge.js'

class RequestDetails extends React.Component {
  componentDidMount () {
    this.props.actions.getRequest(this.props.match.params.id).catch(e => console.log(e))
  }

  render () {
    if (!this.props.request) {
      return null
    }

    let processed = this.props.request.processed
    let proof = this.props.request.proof

    let prcType = processed ? 'success' : 'warning'
    let prcMsg = processed ? 'Processed' : 'On hold'

    let prClass = proof ? 'success' : 'warning'
    let prMsg = proof ? 'Proof' : 'No proof'

    let date = !isNaN(new Date(this.props.request.created_at)) ? moment(new Date(this.props.request.created_at)).format('DD/MM/YYYY') : 'No date provided'

    return (
      <article className='card request-details'>
        <h5 className='card-header'>Request details
          <Badge type={prcType} msg={prcMsg} />
          <Badge type={prClass} msg={prMsg} />
        </h5>
        <div className='card-body'>
          <h5 className='card-title'>Data set: {this.props.request.data}</h5>
          <h6 className='card-subtitle mb-2'>Contract address:
            <span className='text-muted'> {this.props.request.contract_address}</span>
          </h6>
          <h6 className='card-subtitle mb-2'>Tx:
            <span className='text-muted'> {this.props.request.tx}</span>
          </h6>
          <h6 className='card-subtitle mb-2'>Requestor:
            <span className='text-muted'> {this.props.request.account}</span>
          </h6>
          <h6 className='card-subtitle mb-2'>Data provider:
            <span className='text-muted'> {this.props.request.provider}</span>
          </h6>
        </div>
        <div className='card-footer text-muted'>
          Created at: {date}
        </div>
      </article>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ getRequest }, dispatch)
})

const mapStateToProps = state => ({
  request: state.requests[0]
})

export default connect(mapStateToProps, mapDispatchToProps)(RequestDetails)
