import React from 'react'
import { NavLink } from 'react-router-dom'

export default class Nav extends React.Component {
  render () {
    const menuItems = this.props.menuItems.map((item) =>
      <li className='nav-item' key={item.id}><NavLink className='nav-link' to={item.url}>{item.title}</NavLink></li>
    )

    return (

      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <NavLink to='/' className='navbar-brand'>{this.props.title}</NavLink>
        <button className='navbar-toggler navbar-toggler-right' type='button' data-toggle='collapse' data-target='#navbarNav' aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon' />
        </button>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav'>
            {menuItems}
            <li className='nav-item dropdown'>
              <a className='nav-link dropdown-toggle' href='#' id='navbarDropdown' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
                Register
              </a>
              <div className='dropdown-menu' aria-labelledby='navbarDropdown'>
                <NavLink className='dropdown-item' to='/datastore/add'>Data set</NavLink>
                <NavLink className='dropdown-item' to='/requests/add'>Request</NavLink>
                <NavLink className='dropdown-item' to='/processors/add'>Processor</NavLink>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}
