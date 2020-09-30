import React, { Component } from 'react'
import './headerbox.css'
export class headerbox extends Component {
  render () {
    return (
      <div className="headerbox">
        {this.props.title}
      </div>
    )
  }
}

export default headerbox
