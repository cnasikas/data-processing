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
            <article className="contract-details">
                <div className="contract-header">
                  <h1>Contract: {this.props.contract[0].id}</h1>
                </div>
                <div className="contract-body">
                    <ul className="list-group">
                      <li className="list-group-item">Hash: {this.props.contract[0].hash}</li>
                      <li className="list-group-item">Owner: {this.props.contract[0].owner}</li>
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