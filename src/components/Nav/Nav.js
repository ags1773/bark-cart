import React, { Component } from 'react'
import './Nav.css'
import { Link } from 'react-router-dom'

class Nav extends Component {
  render () {
    return (
      <div className='tabs is-medium'>
        <ul>
          {/* <li className='is-active'><Link to='/'>Home</Link></li> */}
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/cart'>Cart</Link></li>
          <li><Link to='/admin'>Admin</Link></li>
        </ul>
      </div>
    )
  }
}

export default Nav
