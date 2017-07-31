import React from 'react';
import Notification from './Notification'

export default class Notifications extends React.Component {
	
    constructor(props) {
        super(props);
        this.state = {
            notifications: []
        }
    }

    render() {

        let notif = this.state.notifications.length > 0 ?
        this.state.notifications.map( (n, index) => <Notification key={index} type={n.type}></Notification> )
        : ''

        return(
            <div className="notifications">{notif}</div>
        );
    }
}