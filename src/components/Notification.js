import React from 'react';

export default class Notification extends React.Component {

    render() {

        return(
            <div className={"alert alert-" + this.props.type} role="alert">
                <strong>Oh snap!</strong>
            </div>
        );
    }
}