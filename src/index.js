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
      test: 'TEST123',
      fetchedItems: [],
      error: {
        status: false,
        message: ''
      }
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
  changeItemQty (id, flag) {
    const tempCopy = this.state.fetchedItems.slice()
    for (let item of tempCopy) {
      if (item._id === id) {
        if (flag) item.quantity++
        else {
          if (item.quantity > 0) item.quantity--
        }
      }
      break
    }
    this.setState({fetchedItems: tempCopy})
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
                  changeItemQty={this.changeItemQty.bind(this)}
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
