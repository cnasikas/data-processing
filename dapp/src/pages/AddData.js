import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

import { addData, addNotification } from "../actions/ActionCreators";
import AddDataForm from '../components/AddDataForm'

class AddData extends React.Component {

  submit = (values) => {
    this.props.actions.addData(values).then((response) => {

      let message = <Link to={'/datastore/'} >{'Data successuflly added. Return to Data Store'}</Link>

      this.props.actions.addNotification({type: 'success', message: message, class: 'success'})

    }).catch(e => console.log(e))
  }

	render() {

    	return (
        <div>
          <AddDataForm onSubmit={this.submit} />
        </div>
    	)
  	}
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ addData, addNotification }, dispatch)
});

const mapStateToProps = state => ({
  contract: state.contracts
});

export default connect(mapStateToProps, mapDispatchToProps)(AddData);
