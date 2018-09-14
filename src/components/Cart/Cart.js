import React, { Component } from 'react'
import './Cart.css'

class Cart extends Component {
  constructor (props) {
    super()
    this.state = {
      boughtItems: props.boughtItems,
      fetchedItems: props.fetchedItems,
      message: ''
    }
  }
  componentDidMount () {
    console.log('Cart component state>>', this.state)
    console.log(this.state.boughtItems)
  }
  render () {
    let allCartItems = this.state.boughtItems.map(item => CartItem(item))
    let totalAmount = 0
    this.state.boughtItems.forEach(item => {
      totalAmount += (item.quantityBought * item.unitPrice)
    })
    return (
      <div>
        <h2>Shopping Cart</h2>
        {allCartItems}
        <hr />
        <p>Net Payable amount: {totalAmount}</p>
        <button onClick={this.props.buyItems.bind(this)}>Buy</button>
        <p>{this.state.message}</p>
      </div>
    )
  }
}

function CartItem (props) {
  return (
    <div className='cartItem' key={props._id}>
      <h3>{props.description}</h3>
      <img src={props.image} alt='' />
      <p>
        Unit Price: {props.unitPrice} <br />
        Units Bought: {props.quantityBought} <br />
        Price: {props.unitPrice * props.quantityBought}
      </p>
      <hr />
    </div>
  )
}

export default Cart
