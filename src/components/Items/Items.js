import React, { Component } from 'react'
import Item from '../Item/Item'
import './Items.css'

const data = [
  {imgPath: 'dog.png', qty: 7, description: 'Lorem ipsum dolor sit amet consectetur adipisicing'},
  {imgPath: 'tenor.png', qty: 3, description: 'Strong, cream barista black variety milk ristretto'},
  {imgPath: 'favicon.png', qty: 4, description: 'Bacon ipsum dolor amet andouille burgdoggen'}
]
const allItems = data.map((d, i) => <Item
  key={i}
  imgPath={d.imgPath}
  qty={d.qty}
  description={d.description}
/>)

class Items extends Component {
  render () {
    return (
      <div>
        {allItems}
      </div>
    )
  }
}

export default Items
