//get weather
//see if its within threshold : spring, summer, fall, winter
// find an article of clothing that matches the weather
  //we should tag each article of clothing for season, gender, part of body
  //So go over each section of the database that query for this
  // show one upper wear, bottom wear, and shoes
  import React, { Component } from 'react';
  const API_KEY = "5ec90a252ff61a72d9f2944a402d7f8a";

  export default class ClothingImages extends React.Component{
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
    render(){

      return(
          <div >
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
            {this.state.temperature && (this.state.temperature* (9/5) + 32)  > 75 && <h3>Wear something comfortable!  {(this.state.temperature* (9/5) + 32)}</h3>}
            {this.state.temperature && (this.state.temperature* (9/5) + 32)  >= 50 && (this.state.temperature* (9/5) + 32)  <= 75 && <h3> Wear something that keeps you warm! {(this.state.temperature* (9/5) + 32)} </h3>}
            {this.state.temperature && (this.state.temperature* (9/5) + 32)  < 50 && <h3> Stay Warm! {(this.state.temperature* (9/5) + 32)} </h3>}
          </div>
      );
    }
  }
