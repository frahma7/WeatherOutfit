import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import ClothingImages from './components/WeatherLogic.js'
const API_KEY = "5ec90a252ff61a72d9f2944a402d7f8a";

class WeatherOutfit extends Component {

  constructor() {
    super();
    this.state = {
      stuff: [],
    };
  }

  // getDataFromDb = () => {
  //     fetch("http://localhost:3001/api/get")
  //       .then(data => data.json())
  //       .then(res => this.setState({ data: res.data }));
  // };

  async getData(e){
    e.preventDefault();
    var url = "http://localhost:3001/api/get";
    await axios.get(url).then((response) => {
      console.log(response);
       this.setState({
        stuff: response.data
       });
    }).catch((error) => {
      console.log(error);
    });
  };

  render() {
    const { data } = this.state;
    return (
      <div>

        <h1> Weather Wardrobe </h1>

        <button className="btn btn-success" style={{margin:'15px',width:'100px'}}
        onClick={this.getData.bind(this)}>GET</button>

        <ul>

        </ul>

        <ClothingImages />


      </div>
    );
  }
}

export default WeatherOutfit;
