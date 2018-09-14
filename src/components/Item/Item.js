import React from 'react'
import './Item.css'

function Item (props) {
  return (
    <div id='wrapper'>
      <img src={props.image} alt='' />
      <p>Unit price : {props.unitPrice}</p>
      <p>{props.description}</p>
      <div>
        <button onClick={props.addOrRemoveItem.bind(this, props.id, false)}>Remove</button>
        <button onClick={props.addOrRemoveItem.bind(this, props.id, true)}>Add</button>
        <p>
          Items remaining: {props.quantity}
          <br />
          Bought Qty: {props.boughtQty}
        </p>
      </div>
      <hr />
    </div>
  )
}

export default Item
