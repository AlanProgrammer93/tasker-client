import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../context/auth'
import { removeFromLocalStorage } from '../../helpers/auth';

const Main = () => {
	const [auth, setAuth] = useContext(AuthContext);

	const logout = () => {
		setAuth(null);
		removeFromLocalStorage();
	}

	return (
		<ul className='nav shadow mb-2 d-flex justify-content-between'>
			<li className='nav-item'>
				<NavLink className='nav-link' to='/'>Home</NavLink>
			</li>

			{
				auth !== null && auth !== undefined ? (
					<li>
						<a className='nav-link dropdown-toggle' data-bs-toggle="dropdown">
							{auth?.user?.name}
						</a>
						<ul className='dropdown-menu'>
							<li>
								<NavLink className='nav-link' to='/dashboard'>
									Dashboard
								</NavLink>
							</li>
							<li>
								<NavLink className='nav-link' to='/login' onClick={logout}>
									Logout
								</NavLink>
							</li>
						</ul>
					</li>
				) : (
					<>
						<li className='nav-item'>
							<NavLink className='nav-link' to='/register'>Register</NavLink>
						</li>
						<li className='nav-item'>
							<NavLink className='nav-link' to='/login'>Login</NavLink>
						</li>
					</>
				)
			}
		</ul>
	)
}

export default Main