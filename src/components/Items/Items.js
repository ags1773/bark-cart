import React, { Component } from 'react'
import Item from '../Item/Item'
import './Items.css'

class Items extends Component {
  render () {
    return (
      <div>
        <Item imgPath='dog.png' />
        <Item imgPath='tenor.png' />
        <Item imgPath='favicon.png' />
      </div>
    )
  }
}

export default Items
