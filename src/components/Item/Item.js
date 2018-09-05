import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Item.css'

class Item extends Component {
  constructor (props) {
    super()
    this.state = {
      imgPath: props.imgPath
    }
  }
  render () {
    return (
      <div id='wrapper'>
        <img src={'./' + this.state.imgPath} />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, beatae!</p>
        <div>
          <button>up</button>
          <button>down</button>

        </div>
      </div>
    )
  }
}

Item.propTypes = {
  imgPath: PropTypes.string
}

export default Item
