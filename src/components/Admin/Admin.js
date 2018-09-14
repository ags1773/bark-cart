import React, { Component } from 'react'
import './Admin.css'
const url = 'http://localhost:4000/item'

class Admin extends Component {
  constructor () {
    super()
    this.image = ''
    this.description = ''
    this.quantity = 0
    this.unitPrice = 0
  }
  sendData (data) {
    fetch(url, {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(data)
    })
      .then(() => {
        this.props.history.push('/')
      })
      .catch(e => console.log(e))
  }
  handleChangeImage (e) {
    this.setState({image: e.target.value})
  }
  handleChangeDesc (e) {
    this.setState({description: e.target.value})
  }
  handleChangeQty (e) {
    this.setState({quantity: e.target.value})
  }
  handleChangePrice (e) {
    this.setState({unitPrice: e.target.value})
  }
  handleBtnClick (e) {
    e.preventDefault()
    if (this.state && this.state.image.trim() && this.state.description.trim() && this.state.quantity > 0) {
      this.sendData({
        image: this.state.image,
        description: this.state.description,
        quantity: this.state.quantity,
        unitPrice: this.state.unitPrice
      })
    }
  }

  render () {
    return (
      <form className='container'>
        <div className='field'>
          <label className='label'>Image URL</label>
          <div className='control'>
            <input className='input' type='text' onChange={this.handleChangeImage.bind(this)} />
          </div>
        </div>
        <div className='field'>
          <label className='label'>Description</label>
          <div className='control'>
            <textarea className='textarea' onChange={this.handleChangeDesc.bind(this)} />
          </div>
        </div>
        <div className='field'>
          <label className='label'>Quantity</label>
          <div className='control'>
            <input className='input' type='number' min='0' onChange={this.handleChangeQty.bind(this)} />
          </div>
        </div>
        <div className='field'>
          <label className='label'>Unit Price</label>
          <div className='control'>
            <input className='input' type='number' min='0' onChange={this.handleChangePrice.bind(this)} />
          </div>
        </div>
        <div className='field'>
          <div className='control'>
            <button
              className='button is-link'
              onClick={this.handleBtnClick.bind(this)}
            >Submit</button>
          </div>
        </div>
      </form>
    )
  }
}

export default Admin
