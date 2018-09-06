import React, { Component } from 'react'
import Item from '../Item/Item'
import './Items.css'
const url = 'http://localhost:4000/item'

class Items extends Component {
  constructor () {
    super()
    this.state = {
      fetchedItems: []
    }
  }
  componentDidMount () {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.length) this.setState({fetchedItems: data})
      })
      .catch(e => console.log('Error fetching items from API', e))
  }
  onIncrement (i) {
    const temp = JSON.parse(JSON.stringify(this.state.fetchedItems))
    temp[i].quantity++
    this.setState({fetchedItems: temp})
  }
  onDecrement (i) {
    const temp = JSON.parse(JSON.stringify(this.state.fetchedItems))
    temp[i].quantity--
    this.setState({fetchedItems: temp})
  }
  items () {
    return this.state.fetchedItems.map((itemObj, i) => {
      return <Item
        key={i}
        id={itemObj.id}
        image={itemObj.image}
        description={itemObj.description}
        quantity={itemObj.quantity}
        countUp={this.onIncrement.bind(this, i)} // bind is needed because onIncrement() is run later (after clicking button). At the time of running, 'this' will be undefined inside the function
        countDown={this.onDecrement.bind(this, i)}
      />
    })
  }

  render () {
    return (
      <div>
        {this.items()}
      </div>
    )
  }
}

export default Items
