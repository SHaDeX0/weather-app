import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Error from './Pages/Error/Error'
import Home from './Pages/Home/Home'

const App = () => {
	return (
		<>
			<Router>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='*' element={<Error />} />
				</Routes>
			</Router>
		</>
	)
}

export default App
