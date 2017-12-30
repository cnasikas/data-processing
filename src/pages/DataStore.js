import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment'
import { Link } from 'react-router-dom'

import { getData } from '../actions/ActionCreators'
import Data from '../components/Data.js'

import '../css/DataStore.css'

class DataStore extends React.Component {
  componentDidMount () {
    this.props.actions.getData().catch(e => console.log(e))
  }

  render () {
    let datastore = ''
    console.log(this.props.datastore)
    if (this.props.datastore.length > 0) {
      datastore = this.props.datastore.map((data, index) => {
        let date = !isNaN(new Date(data.created_at)) ? moment(new Date(data.created_at)).format('DD/MM/YYYY') : 'No date provided'
        return <Data {...data} key={data._id} date={date} index={index + 1} />
      })
    }

    return (

      <section id='datastore' className='list-group'>
        {datastore}
        <ul className='nav'>
          <li className='nav-item'>
            <Link to='/datastore/add' className='nav-link btn btn-primary'>Add data</Link>
          </li>
        </ul>
      </section>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ getData }, dispatch)
})

const mapStateToProps = state => ({
  datastore: state.datastore
})

export default connect(mapStateToProps, mapDispatchToProps)(DataStore)
