import React from 'react'
import moment from 'moment'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import AddResourceBtn from '../components/AddResourceBtn.js'

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

    let date = !isNaN(new Date(this.props.data.created_at)) ? moment(new Date(this.props.data.created_at)).format('DD/MM/YYYY') : 'No date provided'

    return (
      <article className='card data-details border-secondary mb-3'>
        <h5 className='card-header'>Data set details</h5>
        <div className='card-body'>
          <h5 className='card-title'>Name: {this.props.data.name}</h5>
          <h5 className='card-subtitle'>Category: {this.props.data.category}</h5>
        </div>
        <div className='card-body'>
          <h6 className='card-subtitle mb-2'>Slug:
            <span className='text-muted'> {this.props.data.slug}</span>
          </h6>
          <h6 className='card-subtitle mb-2'>Location:
            <span className='text-muted'> {this.props.data.location}</span>
          </h6>
          <h6 className='card-subtitle mb-2'>Data Hash:
            <span className='text-muted'> {this.props.data.digest}</span>
          </h6>
          <h6 className='card-subtitle mb-2'>Metadata Hash:
            <span className='text-muted'> {this.props.data.hash}</span>
          </h6>
          <h6 className='card-subtitle mb-2'>Contract address:
            <span className='text-muted'> {this.props.data.contract_address}</span>
          </h6>
          <h6 className='card-subtitle mb-2'>Tx:
            <span className='text-muted'> {this.props.data.tx}</span>
          </h6>
          <h6 className='card-subtitle mb-2'>Controller:
            <span className='text-muted'> {this.props.data.account}</span>
          </h6>
          <h6 className='card-subtitle mb-2'>Gas Used:
            <span className='text-muted'> {this.props.data.gasUsed}</span>
          </h6>
        </div>
        <div className='card-body'>
          <AddResourceBtn to='/requests/add' text='Request for processing' />
        </div>
        <div className='card-footer text-muted'>
          Created at: {date}
        </div>
      </article>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ getData }, dispatch)
})

const mapStateToProps = state => ({
  data: state.datastore[0]
})

export default connect(mapStateToProps, mapDispatchToProps)(DataDetails)
