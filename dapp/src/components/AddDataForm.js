import React from 'react'
import { Field, reduxForm } from 'redux-form'

class AddDataForm extends React.Component {
  constructor (props) {
    super(props)
    this.handleSubmit = this.props.handleSubmit.bind(this)
  }

  render () {
    return (
      <section id='new-contract'>
        <form onSubmit={this.handleSubmit}>
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
          <div className='form-group'>
            <button type='submit' className='btn btn-primary'>Submit</button>
          </div>
        </form>
      </section>
    )
  }
}

let addDataForm = reduxForm({
  form: 'contract'
})(AddDataForm)

export default addDataForm
