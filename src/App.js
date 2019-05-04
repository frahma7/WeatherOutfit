import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import  Home  from './Home';
import  WeatherOutfit from './WeatherOutfit';
import { Layout } from './components/Layout';
import { Menu } from './components/Navbar';
import Login from './components/Login';
import fire from './config/Fire';


class App extends Component {
  constructor(props){
    super(props);
    this.state={
      user:{},
    }
  }

  componentDidMount(){
  this.authListener();
  }

  authListener(){
    fire.auth().onAuthStateChanged((user) => {
      // console.log(user);
      if(user){
        this.setState({user});
      }
      else{
        this.setState({user: null});
      }
    });
  }

  render() {
    return (
      <div>        
          {this.state.user ? (<WeatherOutfit />) : (<Login />)}
      </div>
    );
  }
}

export default App;
