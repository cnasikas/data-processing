import React from 'react'
import AppNav from './Nav'

export default class Header extends React.Component {

  constructor (props) {
    	super(props)
    	this.state = {
    		title: 'Data Sharing',
    		menuItems: [
          {id: 'datastore', title: 'Datastore', url: '/datastore'},
          {id: 'requests', title: 'Requests', url: '/requests'},
          {id: 'account', title: 'Account', url: '/account'}
    ]
    	}
  	}

  render () {
    	return (
      		<header>
        <AppNav title={this.state.title} menuItems={this.state.menuItems} />
      		</header>
    	)
  	}
}
