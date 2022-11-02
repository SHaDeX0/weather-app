import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Home.css'

const Home = () => {
	// const [coords, setCoords] = useState({ latitude: 12.8997, longitude: 74.985 })
	const [coords, setCoords] = useState({})
	const [location, setLocation] = useState('')
	const api = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=d188ff69879accafe02475a09baecc47`
	const locApi = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=d188ff69879accafe02475a09baecc47`
	const api7days = `https://api.openweathermap.org/data/2.5/forecast?lat=${coords.latitude}&lon=${coords.longitude}&appid=36fed135035d571787b23407fdf74e63`
	const locApi7days = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=36fed135035d571787b23407fdf74e63`
	const [weatherData, setWeatherData] = useState('')
	const [data7, setData7] = useState('')

	const setTheCoordinates = async pos => {
		await setCoords({ latitude: pos.coords.latitude, longitude: pos.coords.longitude })
	}

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(pos => {
				setTheCoordinates(pos).then(res => {
					if (coords.latitude && coords.longitude) {
						axios
							.get(api)
							.then(data => {
								setWeatherData(data.data)
							})
							.catch(err => console.log(err))

						axios
							.get(api7days)
							.then(({ data }) => {
								setData7(data)
							})
							.catch(err => console.log(err))
					}
				})
			})
		}

		document.getElementById('sevenDays').addEventListener('wheel', event => {
			document.getElementById('sevenDays').scrollLeft += event.deltaY * 0.2
		})
		document.getElementById('sevenDays').addEventListener('mouseenter', event => {
			var xPos = window.scrollX
			var yPos = window.scrollY
			window.onscroll = () => {
				window.scroll(xPos, yPos)
			}
		})
		document.getElementById('sevenDays').addEventListener('mouseleave', event => (window.onscroll = ''))
		console.log('useEffect')
	}, [api, api7days, coords.latitude, coords.longitude])

	const search = event => {
		if (event.key === 'Enter') {
			axios
				.get(locApi)
				.then(({ data }) => {
					setWeatherData(data)
				})
				.catch(err => console.log(err))
			axios
				.get(locApi7days)
				.then(({ data }) => {
					setData7(data)
				})
				.catch(err => console.log(err))
			setLocation('')
		}
	}

	return (
		<>
			<div className='app'>
				<h1
					style={{
						position: 'sticky',
						top: 0,
						left: 0,
						color: '#fff',
						zIndex: 1,
						fontSize: '4rem',
						padding: '1% 2.5%',
					}}
					onClick={() => {
						navigator.geolocation.getCurrentPosition(pos => {
							setTheCoordinates(pos).then(res => {
								axios
									.get(api)
									.then(data => {
										setWeatherData(data.data)
									})
									.catch(err => console.log(err))

								axios
									.get(api7days)
									.then(({ data }) => {
										setData7(data)
									})
									.catch(err => console.log(err))
							})
						})
					}}
				>
					WeatherX
				</h1>
				<div className='search'>
					<input
						value={location}
						onChange={e => setLocation(e.target.value)}
						placeholder='Enter Location'
						onKeyPress={search}
						type='text'
					/>
				</div>
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
				<div id='fiveDays'>
					<h1 style={{ color: 'rgb(200, 200, 255)' }}>5 Days Forecast</h1>
				</div>
				<div id='sevenDays' className='sevenDays'>
					{data7.list ? (
						<>
							{data7.list.map((item, id) => (
								<div key={id}>
									<div className='temp'>
										<h2>{item.main.temp.toFixed() - 273}°C</h2>
									</div>
									<div className='date'>
										<p>
											{new Date(item.dt_txt).getDate()}/{new Date(item.dt_txt).getMonth()} at{' '}
											{new Date(item.dt_txt).getHours()}:00
										</p>
									</div>
								</div>
							))}
						</>
					) : null}
				</div>
			</div>
		</>
	)
}

export default Home
