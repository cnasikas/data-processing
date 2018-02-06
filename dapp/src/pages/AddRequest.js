import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

import { addRequest, addNotification } from "../actions/ActionCreators";
import AddRequestForm from '../components/AddRequestForm'

class AddRequest extends React.Component {

  submit = (values) => {
    this.props.actions.addRequest(values).then((response) => {

      let message = <Link to={'/requests/'} >{'Request successuflly added. Return to requests'}</Link>

      this.props.actions.addNotification({type: 'success', message: message, class: 'success'})

    }).catch(e => console.log(e))
  }

	render() {

    	return (
        <div>
          <AddRequestForm onSubmit={this.submit} />
        </div>
    	)
  	}
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ addRequest, addNotification }, dispatch)
});

const mapStateToProps = state => ({
  request: state.requests
});

export default connect(mapStateToProps, mapDispatchToProps)(AddRequest);
