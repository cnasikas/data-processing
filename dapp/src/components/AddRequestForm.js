import React from 'react'
import { Field } from 'redux-form'

export default class AddRequestForm extends React.Component {
  render () {
    if (!this.props.datastore) {
      return null
    }
    return (
      <section id='new-request-form-fields'>
        <div className='form-group'>
          <label htmlFor='dataset' className='col-form-label'>Data Set</label>
          <Field name='dataset' component='select' className='form-control'>
            {
              this.props.datastore.map((data) => {
                return <option key={data._id} value={data.slug}>{data.name}</option>
              })
            }
          </Field>
        </div>
        <div className='form-group'>
          <label htmlFor='query' className='col-form-label'>Query</label>
          <Field name='query' component='select' className='form-control'>
            <option key='0' value='sum'>Sum</option>
            <option key='1' value='average'>Average</option>
            <option key='2' value='count'>Count</option>
            <option key='3' value='max'>Maximum</option>
            <option key='4' value='median'>Median</option>
            <option key='5' value='min'>Minimum</option>
          </Field>
        </div>
      </section>
    )
  }
}
