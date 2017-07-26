import React, { Component } from 'react';
import AppNav from './Nav'

class AppHeader extends Component {

	constructor(props) {
    	super(props);
    	this.state = {
    		title: 'MPC',
    		menuItems: []
    	}
  	}

	render() {
    	return (
      		<header>
      			<AppNav title={this.state.title}></AppNav>
      		</header>
    	);
  	}
}

export default AppHeader;