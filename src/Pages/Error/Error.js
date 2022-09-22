import React from 'react'
import { Link } from 'react-router-dom'
import './Error.css'

const Error = () => {
	return (
		<>
			<h1
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					color: '#fff',
					zIndex: 1,
					fontSize: '4rem',
					padding: '1% 2.5%',
				}}
			>
				WeatherX
			</h1>
			<div className='errorContainer'>
				<h1>404 Error</h1>
				<h2>Page not found!</h2>
				<Link to='/' style={{ left: '20%' }}>
					<h2>Go Home</h2>
				</Link>
			</div>
		</>
	)
}

export default Error
