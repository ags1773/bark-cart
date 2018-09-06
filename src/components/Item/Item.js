import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Item.css'

class Item extends Component {
  render () {
    // return (
    //   <div id='wrapper'>
    //     <img src={'./' + this.props.imgPath} alt='' />
    //     <p>{this.props.description}</p>
    //     <div>
    //       <button onClick={this.props.increment(this.props.id)}>up</button>
    //       <button>down</button>
    //       qty: {this.props.qty}
    //     </div>
    //   </div>
    // )
    return (
      <div>
        <button onClick={this.props.sayHello}>say hello</button>
      </div>
    )
  }
}

Item.propTypes = {
  imgPath: PropTypes.string,
  qty: PropTypes.number,
  description: PropTypes.string
}

export default Item
