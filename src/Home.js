import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import fire from './config/Fire';
import {Button} from 'react-bootstrap';
const API_KEY = "5ec90a252ff61a72d9f2944a402d7f8a";


export default class Home extends React.Component{
  constructor(props){
    super(props);
    this.logout= this.logout.bind(this);
  }

  logout(){
    fire.auth().signOut();
  }




  render() {
  return (

      <div>
        <header className="App-header">
          Weather Wardrobe
          <Button onClick={this.logout}> logout </Button>
        </header>
        </div>

    );
    }
  }
