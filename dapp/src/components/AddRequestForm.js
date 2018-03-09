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
          <div className='form-group'>
            <label htmlFor='dataset' className='col-form-label'>Data Set</label>
            <Field name='dataset' component='select' className='form-control'>
              {
                this.props.datastore.map((data) => {
                  return <option value={data.slug}>{data.name}</option>
                })
              }
            </Field>
          </div>
          <div className='form-group'>
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
