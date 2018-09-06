import React, { Component } from 'react'
import Item from '../Item/Item'
import './Items.css'

class Items extends Component {
  // constructor () {
  //   super()
  //   this.state = {
  //     data: {
  //       '1000': {imgPath: 'dog.png', qty: 6, description: 'Lorem ipsum dolor sit amet consectetur adipisicing'},
  //       '1001': {imgPath: 'tenor.png', qty: 3, description: 'Strong, cream barista black variety milk ristretto'},
  //       '1002': {imgPath: 'favicon.png', qty: 4, description: 'Bacon ipsum dolor amet andouille burgdoggen'}
  //     }
  //   }
  //   this.allItems = Object.keys(this.state.data).map(id => {
  //     let dataObj = this.state.data[id]
  //     return <Item
  //       key={id}
  //       id={id}
  //       imgPath={dataObj.imgPath}
  //       qty={dataObj.qty}
  //       description={dataObj.description}
  //       increment={this.increment.bind(this)}
  //     />
  //   })
  // }

  onSayHello () {
    console.log('Hello')
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
        <Item sayHello={this.onSayHello} />
      </div>
    )
  }
}

export default Items
