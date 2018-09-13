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
      error: false
    }
  }
  componentWillMount () {
    fetch(getItemsURL)
      .then(res => res.json())
      .then(data => {
        console.log('DATA >>> ', data)
      })
      .catch(e => {
        console.log(e)
        this.setState({error: true})
      })
  }

  render () {
    return (
      <Router>
        {
          this.state.error
            ? <div>
              <Nav />
              <ErrorComponent />
            </div>
            : <div>
              <Nav />
              <Route
                exact path='/'
                render={() => <Items testProp={this.state.test} />}
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
