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
      boughtItems: [] // array of objects {id:'abc123', qty:3}
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
  addOrRemoveItem (id, flag) { // flag true => item removed; false => item bought
    const fetchedItemsCopy = this.state.fetchedItems.slice()
    const boughtItemsCopy = this.state.boughtItems.slice()
    let item = findMatch(id, fetchedItemsCopy)
    let boughtItem = findMatch(id, boughtItemsCopy)
    if (!boughtItem) boughtItem = new BoughtItem(id)

    if (!flag) {
      if (item.quantity > 0) {
        item.quantity--
        boughtItem.quantity++
      }
    } else {
      if (boughtItem.quantity > 0) {
        item.quantity++
        boughtItem.quantity--
      }
    }
    mergeArrayItem(item, fetchedItemsCopy)
    mergeArrayItem(boughtItem, boughtItemsCopy)
    this.setState({fetchedItems: fetchedItemsCopy})
    this.setState({boughtItems: boughtItemsCopy})
    console.log('fetchedItems >>', this.state.fetchedItems)
    console.log('BoughtItems >>', this.state.boughtItems)
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
                  addOrRemoveItem={this.addOrRemoveItem.bind(this)}
                />}
              />
              <Route
                path='/cart'
                render={() => <Cart testProp={this.state.test} />}
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
function mergeArrayItem (item, arr) {
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

class BoughtItem {
  constructor (id) {
    this._id = id
    this.quantity = 0
  }
}
