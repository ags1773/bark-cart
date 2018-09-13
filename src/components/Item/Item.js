import React from 'react'
import './Item.css'

function Item (props) {
  return (
    <div id='wrapper'>
      <img src={props.image} alt='' />
      <p>{props.description}</p>
      <div>
        <button onClick={props.addOrRemoveItem.bind(this, props.id, true)}>Remove</button>
        <button onClick={props.addOrRemoveItem.bind(this, props.id, false)}>Add</button>
        Items remaining: {props.quantity}
      </div>
    </div>
  )
}

export default Item
