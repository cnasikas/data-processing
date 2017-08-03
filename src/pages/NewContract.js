import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

import { newContract } from "../actions/ActionCreators";
import NewContractForm from '../components/NewContractForm'

class NewContract extends React.Component {

  submit = (values) => {
    this.props.actions.newContract(values)
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
  actions: bindActionCreators({ newContract }, dispatch)
});

const mapStateToProps = state => ({
  contract: state.contracts
});

export default connect(mapStateToProps, mapDispatchToProps)(NewContract);