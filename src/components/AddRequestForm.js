import React from 'react'
import { Field, reduxForm } from 'redux-form'

class AddRequestForm extends React.Component {
  constructor (props) {
    super(props)
    this.handleSubmit = this.props.handleSubmit.bind(this)
  }

  render () {
    return (
      <section id='new-request'>
        <form onSubmit={this.handleSubmit}>
          <div className='form-group row'>
            <label htmlFor='example-text-input' className='col-2 col-form-label'>Data Address</label>
            <div className='col-10'>
              <Field className='form-control' name='data_addr' component='input' type='text' />
            </div>
          </div>
          <div className='form-group row'>
            <button type='submit' className='btn btn-primary'>Submit</button>
          </div>
        </form>
      </section>
    )
  }
}

let addRequestForm = reduxForm({
  form: 'request'
})(AddRequestForm)

export default addRequestForm
