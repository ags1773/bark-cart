import React from 'react'
import Item from '../Item/Item'
import './Items.css'

function Items (props) {
  function items () {
    return props.fetchedItems.map((itemObj) => {
      const itemId = itemObj._id
      const itemsBought = findMatch(itemId, props.boughtItems)
      return <Item
        key={itemId}
        id={itemId}
        image={itemObj.image}
        description={itemObj.description}
        quantity={itemObj.quantity}
        boughtQty={itemsBought ? itemsBought.quantityBought : 0}
        addOrRemoveItem={props.addOrRemoveItem}
      />
    })
  }
  function findMatch (id, items) {
    for (let item of items) {
      if (item._id === id) {
        return item
      }
    }
    return false
  }

  return (
    <div>
      {items()}
    </div>
  )
}

export default Items
