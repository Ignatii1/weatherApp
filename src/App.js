import React, { useState, useEffect } from 'react'
import './App.css'

const API_KEY = '081891c3558231a7772c677f6123db3b'

function App() {
  const [weather, setWeather] = useState({})
  const [city, setCity] = useState('Москва')
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
      console.log(data)
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
        <h1>Пусть в вашем доме всегда будет хорошая погода</h1>
      </header>
      <form onSubmit={onSubmit}>
        <div className="group">
          <input
            type="text"
            placeholder="&nbsp;"
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
          />
          <span className="highlight"></span>
          <span className="bar"></span>
          <label></label>
        </div>
        <button type="submit" className="search-button">
          Поиск
        </button>
      </form>
      <article>
        {weather.main ? (
          <div className="weather-card">
            {weather.name && <p className="city">{weather.name}</p>}
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
