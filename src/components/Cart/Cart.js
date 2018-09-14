import React, { Component } from 'react'
import './Cart.css'
const getItemURL = 'http://localhost:4000/item'

class Cart extends Component {
  constructor (props) {
    super()
    this.state = {
      boughtItems: props.boughtItems,
      fetchedItems: props.fetchedItems,
      message: ''
    }
  }
  componentWillMount () {
    console.log('props.boughtItems >>', this.props.boughtItems)
    console.log('props.fetchedItems >>', this.props.fetchedItems)
  }
  render () {
    return (
      <div>
        <h2>CART Component</h2>
        <button onClick={this.props.buyItems}>Buy</button>
        <p>{this.state.message}</p>
      </div>
    )
  }
}

export default Cart
