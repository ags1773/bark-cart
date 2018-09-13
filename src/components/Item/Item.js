import React from 'react'
import './Item.css'

function Item (props) {
  return (
    <div id='wrapper'>
      <img src={props.image} alt='' />
      <p>{props.description}</p>
      <div>
        <button onClick={props.changeItemQty.bind(this, props.id, true)}>up</button>
        <button onClick={props.changeItemQty.bind(this, props.id, false)}>down</button>
        qty: {props.quantity}
      </div>
    </div>
  )
}

export default Item
