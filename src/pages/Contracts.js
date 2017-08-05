import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import moment from 'moment'
import { Link } from 'react-router-dom';

import { getContracts } from "../actions/ActionCreators";
import Contract from '../components/Contract.js'

import '../css/Contracts.css'

class Contracts extends React.Component {

	componentDidMount(){
        this.props.actions.getContracts().catch(e => console.log(e))
	}

    render() {

    	let contracts = ''

    	if(this.props.contracts.length > 0){

            contracts = this.props.contracts.map ((contract) => {

                let date = !isNaN(new Date(contract.timestamp)) ? moment(new Date(contract.timestamp)).format('DD/MM/YYYY') : 'No date provided'

                return <Contract {...contract} key={contract.id} date={date}></Contract>
            })
    	}

        return(

            <section id="contracts">
                <ul className="nav">
                  <li className="nav-item">
                    <Link to="/contracts/metadata/new" className="nav-link">New contract</Link>
                  </li>
                </ul>
            	{contracts}	
            </section>
        );
    }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ getContracts }, dispatch)
});

const mapStateToProps = state => ({
  contracts: state.contracts
});

export default connect(mapStateToProps, mapDispatchToProps)(Contracts);