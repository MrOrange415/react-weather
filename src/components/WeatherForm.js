import React, {Component} from 'react';

const GET_WEATHER_API = 'http://api.openweathermap.org/data/2.5/weather';
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const IMPERIAL= 'units=imperial';

class WeatherForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: '',
            errorMessage: '',
        }
    }

    /**
     * Handles location entered by user
     * {object} event - click event from user form
     */
    onChange = (event) => {
        this.setState({ location: event.target.value});
    }

    /**
     * submit form to weather api
     * {string} url - url to fetch data from
     */
    submitForm = event => {
        event.preventDefault();
        const WEATHER_URL = `${GET_WEATHER_API}?q=${this.state.location}&appid=${API_KEY}&${IMPERIAL}`;

        fetch(WEATHER_URL, { method: 'GET' })
        .then(response => response.json())
        .then((weather) => {
            this.successHandler(weather);
        })
        .catch((error) => this.errorHandler(error));
    };

    /**
     * Success callback handler
     * {Object} weatherInfo - return object from weather api containing weather info for location
     */
    successHandler = (weatherInfo) => {
        if (weatherInfo.cod === 200) {
            this.props.callback(weatherInfo);
        } else {
            this.errorHandler(weatherInfo);
        }
    }

    /**
     * Error handler for api call
     */
    errorHandler = (error) => {
        if (parseInt(error.cod) === 404) {
            this.setState({errorMessage: `${error.message}.  Please try again.`, location: ''});
        }
        console.log('do something with this error', error);
    };

    render() {
        return (
            <form>
                <label>Enter a location here:</label>
                <input type='text' name='location' value={this.state.location} onChange={this.onChange}></input>
                <button onClick={this.submitForm}>Submit</button>
                {this.state.errorMessage && (
                    <div>{this.state.errorMessage}</div>
                )}
            </form>
        )
    }
}

export default WeatherForm;
