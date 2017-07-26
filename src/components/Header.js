import React from 'react';
import AppNav from './Nav'

export default class Nav extends React.Component {

	constructor(props) {
    	super(props);
    	this.state = {
    		title: 'MPC',
    		menuItems: [
          {id: 'contracts', title: 'Contracts', url: '/contracts'},
          {id: 'requests', title: 'Requests', url: '/requests'}
        ]
    	}
  	}

	render() {
    	return (
      		<header>
      			<AppNav title={this.state.title} menuItems={this.state.menuItems}></AppNav>
      		</header>
    	);
  	}
}