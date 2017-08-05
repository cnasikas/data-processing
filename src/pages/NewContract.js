import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

import { newContract, addNotification } from "../actions/ActionCreators";
import NewContractForm from '../components/NewContractForm'

class NewContract extends React.Component {

  submit = (values) => {
    this.props.actions.newContract(values).then((response) => {

      let message = <Link to={'/contracts/' + response.payload.data.id} >{'Contract successfully deployed. Address: ' + response.payload.data.id}</Link>

      this.props.actions.addNotification({type: 'success', message: message, class: 'success'})

    }).catch(e => console.log(e))
  }

	render() {

    	return (
        <div>
          <NewContractForm onSubmit={this.submit} />
        </div>
    	)
  	}
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ newContract, addNotification }, dispatch)
});

const mapStateToProps = state => ({
  contract: state.contracts
});

export default connect(mapStateToProps, mapDispatchToProps)(NewContract);