import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

import { getContract } from "../actions/ActionCreators";

import '../css/Contracts.css';

class ContractDetails extends React.Component {

    constructor(props){
        super(props)
        this.props.actions.getContract(this.props.match.params.id).catch(e => console.log(e))
    }
	
    render() {
        
        if(!this.props.contract[0])
            return (<div></div>)

        return(
          <article className="card border-dark text-dark contract-details">
            <div className="card-header contract-header">
              Conctract Details
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Address: {this.props.contract[0].id}</li>
                <li className="list-group-item">TxHash: {this.props.contract[0].hash}</li>
                <li className="list-group-item">Owner: {this.props.contract[0].owner}</li>
                <li className="list-group-item">Data: {this.props.contract[0].data.hash_pointer}</li>
              </ul>
            </div>
          </article>
        );
    }
}


const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ getContract }, dispatch)
});

const mapStateToProps = state => ({
  contract: state.contracts
});

export default connect(mapStateToProps, mapDispatchToProps)(ContractDetails);