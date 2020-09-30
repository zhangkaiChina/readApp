import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import './footerbox.css'
export class footerbox extends Component {
  render () {
    return (
      <div className="footer">
        <NavLink to='/index' className="btn">
          <span className="iconfont">&#xe627;</span>
          推荐
          </NavLink>
        <NavLink to='/bookshelf' className="btn">
          <span className="iconfont">&#xe628;</span>
          书架
          </NavLink>
        <NavLink to='/sreach' className="btn">
          <span className="iconfont">&#xe684;</span>
          搜索
        </NavLink>
      </div>
    )
  }
}

export default footerbox
