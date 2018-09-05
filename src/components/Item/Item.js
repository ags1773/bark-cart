import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Item.css'

class Item extends Component {
  constructor (props) {
    super()
    this.state = {
      imgPath: props.imgPath,
      qty: props.qty,
      description: props.description
    }
  }
  render () {
    return (
      <div id='wrapper'>
        <img src={'./' + this.state.imgPath} alt='' />
        <p>{this.state.description}</p>
        <div>
          <button>up</button>
          <button>down</button>
          qty: {this.state.qty}
        </div>
      </div>
    )
  }
}

Item.propTypes = {
  imgPath: PropTypes.string,
  qty: PropTypes.number,
  description: PropTypes.string
}

export default Item
