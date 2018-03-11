import React from 'react'

export default class Account extends React.Component {
  render () {
    return (
      <tr>
        <th scope='row'>{this.props.index}</th>
        <td>{this.props.account.address}</td>
        <td>{this.props.account.balance}</td>
      </tr>
    )
  }
}
