import React from 'react';
import { NavLink } from 'react-router-dom';


export default class Nav extends React.Component {

    render() {

	    const menuItems = this.props.menuItems.map((item) =>
		  <NavLink className="navbar-brand" key={item.id} to={item.url}>{item.title}</NavLink>
		);

        return(

        	<nav className="navbar navbar-toggleable-md navbar-light bg-faded">
			  <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
			    <span className="navbar-toggler-icon"></span>
			  </button>
			  <NavLink to="/" className="navbar-brand">{this.props.title}</NavLink>
			  <div className="collapse navbar-collapse" id="navbarNav">
			    <ul className="navbar-nav">
			      {menuItems}
			    </ul>
			  </div>
			</nav>
        );
    }
}