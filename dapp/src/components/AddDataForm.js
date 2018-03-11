import React from 'react'
import { Field } from 'redux-form'

export default class AddDataForm extends React.Component {
  render () {
    return (
      <section id='new-datase-form-fields'>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <Field className='form-control' name='name' component='input' type='text' id='name' />
        </div>
        <div className='form-group'>
          <label htmlFor='location'>Location</label>
          <Field className='form-control' name='location' component='input' type='text' id='location' />
        </div>
        <div className='form-group'>
          <label htmlFor='location'>Category</label>
          <Field className='form-control' name='category' component='input' type='text' id='category' />
        </div>
      </section>
    )
  }
}
