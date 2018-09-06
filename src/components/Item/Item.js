import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Item.css'

class Item extends Component {
  render () {
    return (
      <div id='wrapper'>
        <img src={this.props.image} alt='' />
        <p>{this.props.description}</p>
        <div>
          <button onClick={this.props.sayHello}>up</button>
          <button>down</button>
          qty: {this.props.quantity}
        </div>
      </div>
    )
  }
}

Item.propTypes = {
  image: PropTypes.string,
  quantity: PropTypes.number,
  description: PropTypes.string
}

export default Item
