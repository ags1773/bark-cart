import React from 'react'
import Item from '../Item/Item'
import './Items.css'

function Items (props) {
  function items () {
    return props.fetchedItems.map((itemObj) => {
      return <Item
        key={itemObj._id}
        id={itemObj._id}
        image={itemObj.image}
        description={itemObj.description}
        quantity={itemObj.quantity}
        addOrRemoveItem={props.addOrRemoveItem}
      />
    })
  }
  return (
    <div>
      {items()}
    </div>
  )
}

export default Items
