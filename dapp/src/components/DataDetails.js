import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Badge from './Badge.js'

import AddResourceBtn from '../components/AddResourceBtn.js'
import {formatDate} from '../utils/helpers'

import {
  datastoreActions
} from '../actions'

const getData = datastoreActions.getData

class DataDetails extends React.Component {
  componentDidMount () {
    this.props.actions.getData({id: this.props.match.params.id}).catch(e => console.log(e))
  }

  render () {
    if (!this.props.data) {
      return null
    }

    const confirmed = this.props.data.status === 'confirmed'
    const badgeType = confirmed ? 'success' : 'warning'

    return (
      <article className='card data-details border-secondary mb-3'>
        <h5 className='card-header'>
          <span>Data set details</span>
          <Badge type={badgeType} msg={this.props.data.status} />
        </h5>
        <div className='card-body'>
          <h5 className='card-title'>Name: {this.props.data.name}</h5>
          <h5 className='card-subtitle'>Category: {this.props.data.category}</h5>
        </div>
        <div className='card-body'>
          <h6 className='card-subtitle mb-2'>Location:
            <span className='text-muted'> {this.props.data.location}</span>
          </h6>
          <h6 className='card-subtitle mb-2'>Data Hash:
            <span className='text-muted'> {this.props.data.hash}</span>
          </h6>
          <h6 className='card-subtitle mb-2'>Metadata Hash:
            <span className='text-muted'> {this.props.data.meta_hash}</span>
          </h6>
          <h6 className='card-subtitle mb-2'>Tx:
            <span className='text-muted'> {this.props.data.tx_id}</span>
          </h6>
          <h6 className='card-subtitle mb-2'>Controller:
            <span className='text-muted'> {this.props.data.owner}</span>
          </h6>
        </div>
        <div className='card-body'>
          <AddResourceBtn to='/requests/add' text='Request for processing' />
        </div>
        <div className='card-footer text-muted'>
          Created at: {formatDate(this.props.createdAt)}
        </div>
      </article>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ getData }, dispatch)
})

const mapStateToProps = state => ({
  data: state.dataset[0]
})

export default connect(mapStateToProps, mapDispatchToProps)(DataDetails)
