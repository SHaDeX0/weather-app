import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Home.css'

const Home = () => {
	const [coords, setCoords] = useState({ latitude: 12.9066733, longitude: 74.9793129 })
	const api = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=d188ff69879accafe02475a09baecc47`
	const [weatherData, setWeatherData] = useState('')

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(pos => {
				console.log('Latitude: ' + pos.coords.latitude)
				console.log('Longitude: ' + pos.coords.longitude)
				setCoords({ latitude: pos.coords.latitude, longitude: pos.coords.longitude })
			})

			axios.get(api).then(data => {
				console.log(data.data)
				setWeatherData(data.data)
			})
		}
	}, [api])

	return (
		<>
			<div className='app'>
				<div className='container'>
					<div className='top'>
						<div className='location'>{weatherData.name ? <p>{weatherData.name}</p> : null}</div>
						<div className='temp'>{weatherData.main ? <h1>{weatherData.main.temp.toFixed() - 273}°C</h1> : null}</div>
						<div className='desc'>{weatherData.weather ? <p>{weatherData.weather[0].main}</p> : null}</div>
					</div>
					<div className='bottom'>
						<div className='feels'>
							{weatherData.main ? (
								<>
									<p className='bold'>{weatherData.main.feels_like.toFixed() - 273}°C</p>
									<p>Feels Like</p>
								</>
							) : null}
						</div>
						<div className='humidity'>
							{weatherData.main ? (
								<>
									<p className='bold'>{weatherData.main.humidity.toFixed()}%</p>
									<p>Humidity</p>
								</>
							) : null}
						</div>
						<div className='wind'>
							{weatherData.wind ? (
								<>
									<p className='bold'>{weatherData.wind.speed.toFixed()} km/h</p>
									<p>Wind Speed</p>
								</>
							) : null}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Home
