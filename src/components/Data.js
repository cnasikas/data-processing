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
          <li className='list-group-item'>Data: {this.props.data.ciphertext.ct}</li>
          <li className='list-group-item'>IV: {this.props.data.ciphertext.iv}</li>
          <li className='list-group-item'>V: {this.props.data.ciphertext.v}</li>
          <li className='list-group-item'>Iterations: {this.props.data.ciphertext.iter}</li>
          <li className='list-group-item'>KS: {this.props.data.ciphertext.ks}</li>
          <li className='list-group-item'>TS: {this.props.data.ciphertext.ts}</li>
          <li className='list-group-item'>Mode: {this.props.data.ciphertext.mode}</li>
          <li className='list-group-item'>Adata: {this.props.data.ciphertext.adata}</li>
          <li className='list-group-item'>Cipher: {this.props.data.ciphertext.cipher}</li>
        </ul>
        <div className='card-footer text-muted'>
                    Owner: {this.props.user_addr}
        </div>
      </div>
    )
  }
}
