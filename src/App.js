import React, {Component} from 'react';
import './App.css';

import DisplayWeather from './ui/DisplayWeather';


const GET_WEATHER_API = 'http://api.openweathermap.org/data/2.5/weather';
const LOCATION = 'london';
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const IMPERIAL= 'units=imperial';
const WEATHER_URL = `${GET_WEATHER_API}?q=${LOCATION}&appid=${API_KEY}&${IMPERIAL}`;


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: {
        name: '',
        weather: '',
        currentTemp: 0,
        maxTemp: 0,
        minTemp: 0,
        sunrise: 0,
        sunset: 0,
        wind: 0,
      },
      loading: true,
    };
    this.getWeatherData(WEATHER_URL);
  };

  /**
   * update state with weather location of location
   * {string} url - url to fetch data from
   */
  getWeatherData = (url) => {
    fetch(url, { method: 'GET' })
    .then(response => response.json())
    .then((weather) => {
      let parsedWeather = this.parseWeatherData(weather);
      this.setState({weather: parsedWeather});
      this.setState({loading: false});
    });
  };

  /**
   * convert weather object to human readable metrics
   * {object} weather - weather obj to format
   */
  parseWeatherData = (weather) => {
    let sunrise = new Date(weather.sys.sunrise*1000);
    let sunset = new Date(weather.sys.sunset*1000);
    let formattedSunrise = `${sunrise.toUTCString().slice(-11, -7)} A.M.`;
    let formattedSunset = `${sunset.toUTCString().slice(-11, -7)} P.M.`;

    let weatherObj = {
      name: weather.name,
      weather: weather.weather[0].description,
      currentTemp: weather.main.temp,
      maxTemp: weather.main.temp_max,
      minTemp: weather.main.temp_min,
      sunrise: formattedSunrise,
      sunset: formattedSunset,
      wind: weather.wind.speed,
      icon: `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
    };

    return weatherObj;
  }

  render() {
    return (
      <div className="App">
        {!this.state.loading && (
          <DisplayWeather weather={this.state.weather}/>
        )}
      </div>
    );
  }
}

export default App;
