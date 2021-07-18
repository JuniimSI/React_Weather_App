import React, { useState, useEffect } from 'react'
import './App.css'
import HellowWorld from './components/HelloWorld'
import {api} from "./services/weather_api"
import { FaTemperatureHigh, FaWind } from 'react-icons/fa'

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');

  async function handleGetWeather(e){
    e && e.preventDefault();
    const formData = new FormData(e.target);

    const city_param = formData.get('city')

    console.log(city_param)
    const res = await api.get(city_param)
    setCity(city_param)
    setWeather(res.data)
  }

  useEffect(() => {
    handleGetWeather()
  }, [])

  return (
    <div className="App">
      {/* <h1>{"Hello Word".toUpperCase()}</h1>
      <HellowWorld /> */}
      {/* <header>
        <button onClick={handleGetWeather}>Enviar</button>
      </header> */}
      <form onSubmit={handleGetWeather}>
        <input type="text" name="city"/>
        <button type="submit">Enviar</button>
      </form>

      {weather && 
        <main>
          <h1>{city}</h1>

          <section className="current-weather">
            <h2>Current weather</h2>

            <p>{weather.temperature}</p>
            <p>{weather.description}</p>
          </section>

          <section className="forecast">
            <h2>Forecast</h2>
            <ol>
              {
                weather.forecast.map(day => 
                  <li>
                    <div>
                      <FaTemperatureHigh/>
                      <p>{day.temperature}</p>
                    </div>

                    <div>
                      <FaWind />
                      <p>{day.wind}</p>
                    </div>
                  </li>
                )
              }
            </ol>
          </section>
        </main>
      }
    </div>
  )
}

export default App
