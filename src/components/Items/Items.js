import React, { Component } from 'react'
import Item from '../Item/Item'
import './Items.css'
const url = 'http://localhost:4000/item'

class Items extends Component {
  constructor () {
    super()
    this.state = {
      fetchedItems: [],
      error: {
        status: false,
        message: ''
      }
    }
  }
  // componentDidMount () { // fetch moved to parent component
  //   fetch(url)
  //     .then(res => res.json())
  //     .then(data => {
  //       this.setErrorState(false, '')
  //       if (data.length) this.setState({fetchedItems: data})
  //     })
  //     .catch(e => {
  //       this.setErrorState(true, e.message)
  //       console.log(e)
  //     })
  // }
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
        countUp={this.onIncrement.bind(this, i)}
        countDown={this.onDecrement.bind(this, i)}
      />
    })
  }
  setErrorState (status, message) {
    this.setState({
      error: {
        status: status,
        message: message
      }
    })
  }

  render () {
    if (this.state.error.status) {
      return (
        <div>
          <h3>Error Occured</h3>
          <p>{this.state.error.message}</p>
        </div>
      )
    } else {
      return (
        <div>
          {this.items()}
        </div>
      )
    }
  }
}

export default Items
