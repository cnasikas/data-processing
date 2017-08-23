import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

import { getAccount } from "../actions/ActionCreators";

class Account extends React.Component {

	componentDidMount(){
        this.props.actions.getAccount().catch(e => console.log(e))
	}

    render() {

        return(

            <section id="account">
            	<div className="card border-dark text-dark">
					<div className="card-header">
						Account Details
					</div>
					<div className="card-body">
						<ul className="list-group list-group-flush">
					    	<li className="list-group-item">Address: {this.props.account.address}</li>
					    	<li className="list-group-item">Balance: {this.props.account.balance}</li>
				  		</ul>
					</div>
				</div>
            </section>
        );
    }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ getAccount }, dispatch)
});

const mapStateToProps = state => ({
  account: state.account
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);