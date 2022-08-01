import React from 'react'
import { NavLink } from 'react-router-dom'

const Main = () => {
  return (
	<ul className='nav shadow mb-2 d-flex justify-content-between'>
		<li className='nav-item'>
			<NavLink className='nav-link' to='/'>Home</NavLink>
		</li>
		<li className='nav-item'>
			<NavLink className='nav-link' to='/register'>Register</NavLink>
		</li>
		<li className='nav-item'>
			<NavLink className='nav-link' to='/login'>Login</NavLink>
		</li>
	</ul>
  )
}

export default Main