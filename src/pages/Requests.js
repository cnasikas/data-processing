import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment'

import { getRequests } from '../actions/ActionCreators'
import Request from '../components/Request.js'
import AddResourceBtn from '../components/AddResourceBtn.js'

import '../css/Requests.css'

class Requests extends React.Component {
  componentDidMount () {
    this.props.actions.getRequests().catch(e => console.log(e))
  }

  render () {
    let requests = ''
    if (this.props.requests.length > 0) {
      requests = this.props.requests.map((data, index) => {
        let date = !isNaN(new Date(data.timestamp)) ? moment(new Date(data.timestamp)).format('DD/MM/YYYY') : 'No date provided'
        return <Request {...data} key={index} date={date} id={index} />
      })
    }

    return (
      <section id='requests' className='list-group'>
        {requests}
        <AddResourceBtn to='/requests/add' text='Add Request' />
      </section>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ getRequests }, dispatch)
})

const mapStateToProps = state => ({
  requests: state.requests
})

export default connect(mapStateToProps, mapDispatchToProps)(Requests)
