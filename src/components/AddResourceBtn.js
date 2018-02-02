import React from 'react'
import { Link } from 'react-router-dom'

export default class AddResourceBtn extends React.Component {
  render () {
    return (
      <ul className='nav'>
        <li className='nav-item'>
          <Link to={this.props.to} className='nav-link btn btn-primary'>{this.props.text}</Link>
        </li>
      </ul>
    )
  }
}
