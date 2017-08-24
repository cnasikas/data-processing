import React from 'react';
import { Link } from 'react-router-dom';

export default class ContractType extends React.Component {
    render() {
        return(
            <div className="contract card text-center">
            	<div className="card-body">
            		<h4 className="card-title">{this.props.title}</h4>
            		<p className="card-text">{this.props.desc}</p>
            		<Link to={this.props.id + "/add" } className="btn btn-primary">Add</Link>
            	</div>
            </div>
        );
    }
}