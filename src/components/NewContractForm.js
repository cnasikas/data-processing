import React from 'react'
import { Field, reduxForm } from 'redux-form'

class NewContractForm extends React.Component {

  constructor(props){
    super(props)
    this.handleSubmit = this.props.handleSubmit.bind(this)
  }

  render() {
      return (
        <section id="new-contract">
          <form onSubmit={ this.handleSubmit }>
            <div className="form-group row">
              <label htmlFor="example-text-input" className="col-2 col-form-label">Hash</label>
              <div className="col-10">
                <Field className="form-control" name="hash_pointer" component="input" type="text" />
              </div>
            </div>
            <div className="form-group row">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </form>
        </section>
      )
    }
}

NewContractForm = reduxForm({
  form: 'contract'
})(NewContractForm)

export default NewContractForm;