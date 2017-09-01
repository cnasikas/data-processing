import React from 'react'

export default class Data extends React.Component {
  render () {
    return (
      <div className='datastore card border-dark mb-3'>
        <div className='card-header text-muted'>
                    Contract Address: {this.props.contract_address}
        </div>
        <div className='card-body text-dark'>
          <p className='card-text'>You can store one hash pointer per account</p>
        </div>
        <ul className='list-group list-group-flush'>
          <li className='list-group-item'>Data: {this.props.data.hash_pointer}</li>
        </ul>
        <div className='card-footer text-muted'>
                    Owner: {this.props.user_addr}
        </div>
      </div>
    )
  }
}
