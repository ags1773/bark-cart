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

class App extends Component {
  render () {
    return (
      <Router>
        <div>
          <Nav />
          <Route exact path='/' component={Items} />
          <Route path='/cart' component={Cart} />
          <Route path='/admin' component={Admin} />
        </div>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
