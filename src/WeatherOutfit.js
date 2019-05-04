import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import WeatherLogic from './components/WeatherLogic.js'
import Login from './components/Login'
import fire from './config/Fire'


const API_KEY = "5ec90a252ff61a72d9f2944a402d7f8a";

class WeatherOutfit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      stuff: [],
    };
    this.getUser = this.getUser.bind(this);

  }

  getUser(){
    fire.getInstance.currentUser(this.state.user);
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
        stuff: response.data.data
       });
    }).catch((error) => {
      console.log(error);
    });
  };

  render() {
    const  data  = this.state.stuff;
    return (
      <div >


        {/* <button className="btn btn-success" style={{margin:'15px',width:'100px'}}
        onClick={this.getData.bind(this)}>GET</button> */}

        <ul>

        </ul>

        <WeatherLogic />


      </div>
    );
  }
}

export default WeatherOutfit;
