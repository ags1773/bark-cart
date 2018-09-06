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
        if (data.length) {
          this.setState({fetchedItems: data})
        }
      })
      .catch(e => console.log('Error fetching items from API', e))
  }
  onSayHello () {
    console.log('Hello')
  }
  items () {
    return this.state.fetchedItems.map((itemObj, i) => {
      return <Item
        key={i}
        id={itemObj.id}
        image={itemObj.image}
        description={itemObj.description}
        quantity={itemObj.quantity}
        sayHello={this.onSayHello}
      />
    })
  }
  // increment (id) { // terribly inefficient logic; will not have to do this after switching to DB
  //   let dataCopy = Object.assign({}, this.state.data)
  //   console.log('dataCopy', dataCopy[id].qty)
  //   dataCopy[id].qty++
  //   this.setState({data: dataCopy})
  // }

  render () {
    return (
      <div>
        {this.items()}
      </div>
    )
  }
}

export default Items
