import React from 'react'
import './ErrorComponent.css'

function ErrorComponent (props) {
  return (
    <div className='ErrorComponent'>
      <h2>Error Occured. Please reload or try again later</h2>
      <p>Description: {props.message}</p>
    </div>
  )
}

export default ErrorComponent
