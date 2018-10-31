import React from 'react'
import { Field } from 'redux-form'

export default class AddEntityForm extends React.Component {
  render () {
    return (
      <section id='new-datase-form-fields'>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <Field className='form-control' name='name' component='input' type='text' id='name' />
        </div>
        <div className='form-group'>
          <label htmlFor='location'>Public Key</label>
          <Field className='form-control' name='pubkey' component='input' type='text' id='pubkey' />
        </div>
        <div className='form-group'>
          <label htmlFor='address'>Address</label>
          <Field className='form-control' name='address' component='input' type='text' id='address' />
        </div>
      </section>
    )
  }
}
