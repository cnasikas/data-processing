import React from 'react';

export default class Notification extends React.Component {

    render() {

        return(
            <div className={"alert alert-" + this.props.class + " alert-dismissible"} role="alert">
            	<button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.props.onDismissClick}>
					<span aria-hidden="true">&times;</span>
				</button>
                <strong>{this.props.message}</strong>
            </div>
        );
    }
}