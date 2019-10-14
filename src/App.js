import React, {Component} from 'react';
import './App.css';

import DisplayWeather from './ui/DisplayWeather';
import WeatherForm from './components/WeatherForm';


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
      hasLocation: false,
    };
  };


  setWeatherData = (weatherInfo) => {
    this.setState({weather: weatherInfo});
    this.setState({hasLocation: true});
  }

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

    this.setWeatherData(weatherObj);
  }

  /**
   * clear weather data
   */
  resetLocation = () => {
    this.setState({weather: {}});
    this.setState({hasLocation: false});
  }

  render() {
    return (
      <div className="App">
        {!this.state.hasLocation && (
          <WeatherForm callback={this.parseWeatherData}/>
        )}
        {this.state.hasLocation && (
          <DisplayWeather weather={this.state.weather} resetLocation={this.resetLocation}/>
        )}
      </div>
    );
  }
}

export default App;
