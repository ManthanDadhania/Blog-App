import React from 'react'
import logo from '../logo/logo2.png'
function Logo({width = '100px',className=''}) {
  return (
    <div className={`${className}`}>
      <img src={logo} alt="Logo" style={{width}}/>
      <h3 className='text-center font-medium'>BLOG APP</h3>
    </div>
  )
}

export default Logo
