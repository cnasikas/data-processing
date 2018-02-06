import React from 'react'

export default class Badgge extends React.Component {
  render () {
    let className = 'badge badge-' + this.props.type

    return (
      <span className={className}> {this.props.msg}</span>
    )
  }
}
