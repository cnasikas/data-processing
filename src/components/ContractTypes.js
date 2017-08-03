import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

import { getContractTypes } from "../actions/ActionCreators";
import ContractType from '../components/ContractType.js'

import '../css/Contracts.css'

class ContractTypes extends React.Component {

    componentDidMount(){
        this.props.actions.getContractTypes()
    }

    render() {

        let types = ''
        
        if(this.props.types.length > 0){
            types = this.props.types.map ((type, index) => <ContractType key={index} {...type}></ContractType>)
        }

        return(

            <section id="contract-types">
                {types} 
            </section>
        );
    }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ getContractTypes }, dispatch)
});

const mapStateToProps = state => ({
  types: state.contracts
});

export default connect(mapStateToProps, mapDispatchToProps)(ContractTypes);