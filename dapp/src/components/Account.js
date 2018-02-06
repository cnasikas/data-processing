import React from 'react'

export default class Data extends React.Component {
  render () {
    return (
      <li className='list-group-item' >
        {this.props.address}
      </li>
    )
  }
}
