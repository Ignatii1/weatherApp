import React, { useState, useEffect } from 'react'
import './App.css'

const API_KEY = '081891c3558231a7772c677f6123db3b'

function App() {
  const [weather, setWeather] = useState({})
  const [city, setCity] = useState('London')
  const [cityInput, setCityInput] = useState('')

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&appid=${API_KEY}`,
        {
          referrerPolicy: 'no-referrer-when-downgrade',
        }
      )
      const data = await response.json()
      setWeather(data)
    }
    fetchData()
  }, [city])

  function onSubmit(e) {
    e.preventDefault()
    setCity(cityInput)
  }

  return (
    <div className="container">
      <header>
        <h1>Салам алейкум</h1>
      </header>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Enter a city"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <article>
        {weather.main ? (
          <div className="weather-card">
            <p className="temperature">
              Температура: {(weather.main.temp - 273.15).toFixed(1)}
            </p>
            <p>Влажность: {weather.main.humidity}</p>
            <p className="description">
              Описание: {weather.weather[0].description}
            </p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </article>
    </div>
  )
}

export default App
