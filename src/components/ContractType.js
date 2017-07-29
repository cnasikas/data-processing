import React from 'react';
import { Link } from 'react-router-dom';

export default class ContractType extends React.Component {
    render() {
        return(
            <div className="contract card text-center">
            	<div className="card-block">
            		<h4 className="card-title">{this.props.title}</h4>
            		<p className="card-text">{this.props.desc}</p>
            		<Link to={"/contracts/" + this.props.id + "/new" } className="btn btn-primary">Create contract</Link>
            	</div>
            </div>
        );
    }
}