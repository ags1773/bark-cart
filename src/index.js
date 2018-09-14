import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import './index.css'
import 'bulma/css/bulma.css'

import Items from './components/Items/Items'
import Cart from './components/Cart/Cart'
import Nav from './components/Nav/Nav'
import Admin from './components/Admin/Admin'
import ErrorComponent from './components/ErrorComponent/ErrorComponent'

const getItemsURL = 'http://localhost:4000/item'

class App extends Component {
  constructor () {
    super()
    this.state = {
      fetchedItems: [],
      error: {
        status: false,
        message: ''
      },
      boughtItems: []
    }
  }
  componentWillMount () {
    fetch(getItemsURL)
      .then(res => res.json())
      .then(data => {
        this.setErrorState(false, '')
        if (data.length) this.setState({fetchedItems: data})
      })
      .catch(e => this.setErrorState(true, e.message))
  }
  setErrorState (status, message) {
    this.setState({
      error: {
        status: status,
        message: message
      }
    })
  }
  addOrRemoveItem (id, flag) { // flag true => item bought; false => item removed
    const fetchedItemsCopy = this.state.fetchedItems.slice()
    const boughtItemsCopy = this.state.boughtItems.slice()
    let item = findMatch(id, fetchedItemsCopy)
    let boughtItem = findMatch(id, boughtItemsCopy)
    if (!boughtItem) boughtItem = new BoughtItem(item)

    if (flag) {
      if (item.quantity > 0) {
        item.quantity--
        boughtItem.quantityBought++
      }
    } else {
      if (boughtItem.quantityBought > 0) {
        item.quantity++
        boughtItem.quantityBought--
      }
    }

    mergeArrayItem(item, fetchedItemsCopy)
    if (boughtItem.quantityBought > 0) {
      mergeArrayItem(boughtItem, boughtItemsCopy)
    }
    if (boughtItem.quantityBought === 0) {
      findAndRemove(boughtItem._id, boughtItemsCopy)
    }
    this.setState({
      fetchedItems: fetchedItemsCopy,
      boughtItems: boughtItemsCopy
    })
  }
  buyItems () {
    let boughtItemsCopy = this.state.boughtItems.slice()
    let promises = boughtItemsCopy.map(item => {
      return new Promise((resolve, reject) => {
        fetch(`${getItemsURL}/${item._id}`, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          },
          body: JSON.stringify(findMatch(item._id, this.state.fetchedItems))
        })
          .then(res => res.json())
          .then(() => resolve(`Successfully bought ${item.quantityBought} unit(s) of item ${item._id}`))
          .catch(e => reject(e))
      })
    })
    Promise.all(promises)
      .then(msg => {
        console.log(msg)
        this.setState({
          message: msg,
          fetchedItems: this.state.fetchedItems,
          boughtItems: []
        })
      })
      .catch(e => console.log(`Couldn't resolve all promises`, e))
  }
  render () {
    return (
      <Router>
        {
          this.state.error.status
            ? <div>
              <Nav />
              <ErrorComponent message={this.state.error.message} />
            </div>
            : <div>
              <Nav />
              <Route
                exact path='/'
                render={() => <Items
                  fetchedItems={this.state.fetchedItems}
                  boughtItems={this.state.boughtItems}
                  addOrRemoveItem={this.addOrRemoveItem.bind(this)}
                />}
              />
              <Route
                path='/cart'
                render={() => <Cart
                  boughtItems={this.state.boughtItems}
                  fetchedItems={this.state.fetchedItems}
                  buyItems={this.buyItems}
                />}
              />
              <Route path='/admin' component={Admin} />
            </div>
        }
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))

function findMatch (id, items) {
  for (let item of items) {
    if (item._id === id) {
      return item
    }
  }
  return false
}
function mergeArrayItem (item, arr) { // merges 'item' into arr
  let found = false
  for (let arrItem of arr) {
    if (arrItem._id === item._id) {
      found = true
      Object.keys(item).forEach(key => {
        if (arrItem.hasOwnProperty(key)) arrItem[key] = item[key]
      })
      break
    }
  }
  if (!found) arr.push(item)
}
function findAndRemove (id, arr) {
  let idx = arr.indexOf(findMatch(id, arr))
  if (idx > -1) arr.splice(idx, 1)
}

class BoughtItem {
  constructor (item) {
    this._id = item._id
    this.image = item.image
    this.description = item.description
    this.unitPrice = item.unitPrice
    this.quantityBought = 0
  }
}
