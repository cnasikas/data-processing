import React from 'react';

export default class Contract extends React.Component {
    render() {
        return(
            <div className="contract card text-center">
            	<div className="card-block">
            		<h4 className="card-title">{this.props.id}</h4>
            	</div>
            </div>
        );
    }
}