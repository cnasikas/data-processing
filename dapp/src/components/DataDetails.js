import React from 'react'
import moment from 'moment'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getData } from '../actions/ActionCreators'

class DataDetails extends React.Component {
  componentDidMount () {
    this.props.actions.getData(this.props.match.params.id).catch(e => console.log(e))
  }

  render () {
    if (!this.props.data) {
      return null
    }

    let date = !isNaN(new Date(this.props.data.created_at)) ? moment(new Date(this.props.data.created_at)).format('DD/MM/YYYY') : 'No date provided'

    return (
      <article className='card data-details'>
        <h5 className='card-header'>Data details</h5>
        <div className='card-body'>
          <h5 className='card-title'>Hash Pointer: {this.props.data.hash_ptr}</h5>
          <h5 className='card-title'>Key: {this.props.data.enc}</h5>
          <h6 className='card-subtitle mb-2'>Contract address:
            <span className='text-muted'> {this.props.data.contract_address}</span>
          </h6>
          <h6 className='card-subtitle mb-2'>Tx:
            <span className='text-muted'> {this.props.data.tx}</span>
          </h6>
          <h6 className='card-subtitle mb-2'>Account:
            <span className='text-muted'> {this.props.data.account}</span>
          </h6>
          <h6 className='card-subtitle mb-2'>Gas Used:
            <span className='text-muted'> {this.props.data.gasUsed}</span>
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
  actions: bindActionCreators({ getData }, dispatch)
})

const mapStateToProps = state => ({
  data: state.datastore[0]
})

export default connect(mapStateToProps, mapDispatchToProps)(DataDetails)
