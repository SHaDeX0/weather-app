import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
	return (
		<>
			<div className='status'>
				<h1>404 Error</h1>
			</div>
			<div className='statusText'>
				<h3>Page not found!</h3>
			</div>
			<div className=''>
				<Link to='/'>
					<h3>Go Home</h3>
				</Link>
			</div>
		</>
	)
}

export default Error
