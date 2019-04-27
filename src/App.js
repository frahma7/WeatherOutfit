import React, { Component } from 'react';
import './App.css';

const API_KEY = "5ec90a252ff61a72d9f2944a402d7f8a";

class App extends Component {

  state = {
      city:undefined,
      country:undefined,
      temperature:undefined,
      humidity: undefined,
      description: undefined,
      error: undefined
  }

  getFerenheit = () =>{

  }
  getWeather = async(e) => {
    e.preventDefault();
    var city = e.target.elements.city.value;
    var country = e.target.elements.country.value;
    var api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    var data = await api_call.json();
    console.log(data);

    if(city && country && data.name){
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
      });
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter a valid city and country."
      });
    }

  }

  getClothing = async(e) => {
    e.preventDefault();

  }


  render() {
    return (
      <div>

        <h1> Weather Wardrobe </h1>


        <form onSubmit = {this.getWeather}>
          <input type = "text" name = "city" placeholder = "City..."/>
          <input type = "text" name = "country" placeholder = "Country..."/>
          <button> Get Weather </button>
        </form>


        <p>

          {this.state.city && <p> City: {this.state.city} </p> }
          {this.state.country && <p> Country: {this.state.country} </p> }
          {this.state.temperature && <p> Temperature: {(this.state.temperature* (9/5) + 32)} Degrees Farenheit </p> }
          {this.state.humidity && <p> Humidity: {this.state.humidity} </p> }
          {this.state.description && <p> Description: {this.state.description} </p> }
          {this.state.error && <p> Error: {this.state.error} </p> }
        </p>

        <p>
          {this.state.temperature && (this.state.temperature* (9/5) + 32) > 15 && <h3>Wear A T-shirt and Jeans!  {(this.state.temperature* (9/5) + 32)}</h3>}
          {this.state.temperature && (this.state.temperature* (9/5) + 32) <= 15 && <h3>Wear A Sweater and Jeans! {(this.state.temperature* (9/5) + 32)} </h3>}
        </p>

      </div>
    );
  }
}

export default App;
