import React from 'react'
import { reduxForm } from 'redux-form'

export default function withReduxForm (FormComponent, key) {
  class ReduxForm extends React.Component {
    constructor (props) {
      super(props)
      this.handleSubmit = this.props.handleSubmit.bind(this)
    }
    render () {
      return (
        <section id={'form-' + key}>
          <form onSubmit={this.handleSubmit}>
            <FormComponent {...this.props.toPass} />
            <div className='form-group'>
              <button type='submit' className='btn btn-primary'>Submit</button>
            </div>
          </form>
        </section>
      )
    }
  }

  return reduxForm({
    form: key
  })(ReduxForm)
}
