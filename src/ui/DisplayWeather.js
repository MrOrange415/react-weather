import React from 'react';
import './DisplayWeather.css';

// takes weather props and renders ui

// displays basic background image representing current weather, ie sun for sunny, etc

// displays current location and temperature in F

const DisplayWeather = props => {
    let weather = props.weather;
    console.log('weather', weather);
    return <div>
        <h1>The weather in {weather.name} is currently:</h1>
        <p>{weather.currentTemp}° F</p>
        <img className='weather-img' src={weather.icon}></img>
        <p>High: {weather.maxTemp}° F</p>
        <p>Low: {weather.minTemp}° F</p>
        <p>Sunrise: {weather.sunrise}</p>
        <p>Sunset: {weather.sunset}</p>
        <p>Wind: {weather.wind} mph</p>
    </div>;
}

export default DisplayWeather;
