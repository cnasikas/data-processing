import React from 'react'

export default class Contract extends React.Component {
	
    render() {
        return(
            <div className="contract card">
                <div className="card-header">
                    Address: {this.props.id}
                </div>
            	<div className="card-block">
            		<h4 className="card-title">Info</h4>
                     <h6 className="card-subtitle text-muted">Tx Hash: {this.props.hash}</h6>
            	</div>
                <div className="card-footer text-muted">
                    Created at: {this.props.date}
                </div>
            </div>
        );
    }
}