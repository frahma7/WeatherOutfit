//get weather
//see if its within threshold : spring, summer, fall, winter
// find an article of clothing that matches the weather
  //we should tag each article of clothing for season, gender, part of body
  //So go over each section of the database that query for this
  // show one upper wear, bottom wear, and shoes
  import React, { Component } from 'react';
  import {Alert, InputGroup, FormControl,
          Form, Button, Card} from 'react-bootstrap';
  import fire from '../config/Fire'
  import axios from 'axios';


  const API_KEY = "5ec90a252ff61a72d9f2944a402d7f8a";

  export default class ClothingImages extends React.Component{
    constructor(props){
      super(props);
      this.logout= this.logout.bind(this);
    }

    logout(){
      fire.auth().signOut();
    }

    state = {
        clothing: {},
        gender: "Male",
        city:undefined,
        country:undefined,
        temperature:undefined,
        humidity: undefined,
        description: undefined,
        error: undefined
    }
    setMale = async(e) =>{
      e.preventDefault();
        this.setState({
          gender: "Male"
        });
        console.log(this.state.gender)
    }

    setFemale = async(e) =>{
      e.preventDefault();
        this.setState({
          gender: "Female"
        });
        console.log(this.state.gender)
    }

    async getAllData(e) {
      e.preventDefault();
      await this.getWeather(e);
      await this.getClothing(e);
    };

    async getWeather(e) {
      e.preventDefault();
      var city = e.target.elements.city.value;
      var country = e.target.elements.country.value;
      var api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
      var data = await api_call.json();
      console.log(data);

      if(city && country && data.name){
        this.setState({
          temperature: (data.main.temp * (9/5) + 32),
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

    async getClothing(e){
      e.preventDefault();
      var clothingItems = [];
      //top
      let url = this.state.gender == "Male" ? `http://localhost:3001/api/get?where={ "$and" : [ {"article" : "Top"}, {"minTemp": {"$lte": ${this.state.temperature}} }, {"maxTemp": {"$gte": ${this.state.temperature}} } , {"gender" :  "Male" }   ] }` :
                                              `http://localhost:3001/api/get?where={ "$and" : [ {"article" : "Top"}, {"minTemp": {"$lte": ${this.state.temperature}} }, {"maxTemp": {"$gte": ${this.state.temperature}} } , {"gender" :  "Female" }  ] }`;
      await axios.get(url).then((response) => {
        clothingItems.push(response.data.data[0]);
      }).catch((error) => {
        console.log(error);
      });

      //bottom
      url = this.state.gender     == "Male" ? `http://localhost:3001/api/get?where={ "$and" : [ {"article" : "Bottom"}, {"minTemp": {"$lte": ${this.state.temperature}} }, {"maxTemp": {"$gte": ${this.state.temperature}} } , {"gender" :  "Male" }   ] }` :
                                              `http://localhost:3001/api/get?where={ "$and" : [ {"article" : "Bottom"}, {"minTemp": {"$lte": ${this.state.temperature}} }, {"maxTemp": {"$gte": ${this.state.temperature}} } , {"gender" :  "Female" }  ] }`;
      await axios.get(url).then((response) => {
        clothingItems.push(response.data.data[0]);
      }).catch((error) => {
        console.log(error);
      });

      //shoes
      url = this.state.gender    == "Male" ? `http://localhost:3001/api/get?where={ "$and" : [ {"article" : "Shoes"}, {"minTemp": {"$lte": ${this.state.temperature}} }, {"maxTemp": {"$gte": ${this.state.temperature}} } , {"gender" :  "Male" }   ] }` :
                                              `http://localhost:3001/api/get?where={ "$and" : [ {"article" : "Shoes"}, {"minTemp": {"$lte": ${this.state.temperature}} }, {"maxTemp": {"$gte": ${this.state.temperature}} } , {"gender" :  "Female" }  ] }`;
      await axios.get(url).then((response) => {
        clothingItems.push(response.data.data[0]);
      }).catch((error) => {
        console.log(error);
      });
      await this.setState({
       clothing: clothingItems
      });


    }

    render(){
      var outfit=[];
      const clothes=this.state.clothing;
      console.log("clothes");
      console.log(clothes);
      for(var i=0; i<this.state.clothing.length; i++){
        // var image_url="'";
        // image_url+=clothes[i].reference;
        // image_url+="'";
        var image_url=clothes[i].reference;



        console.log(image_url)
        outfit.push(
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="bottom" src={image_url} />
            <Card.Body>
              <Card.Title>{clothes[i].article}</Card.Title>
              <Card.Subtitle>{clothes[i].name}</Card.Subtitle>
            </Card.Body>
          </Card>
        )
      }

      return(
        <div>
            <Button variant='danger' style={{position:'absolute', top:'5%', left:'90%', transform: 'translate(-50%, -10%)'}} onClick={this.logout}> logout </Button>

          <div style={{position:'absolute', top:'50%', left:'50%', transform: 'translate(-50%, -50%)'}} >
          <h1> Weather Wardrobe </h1>
            <Form onSubmit = {this.getAllData.bind(this)}>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">City</InputGroup.Text>
                </InputGroup.Prepend>

                <FormControl
                  name='city'
                  placeholder="City"
                  aria-label="City"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">Country or State</InputGroup.Text>
                </InputGroup.Prepend>

                <FormControl
                  name='country'
                  placeholder="Country"
                  aria-label="Country"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
              <Button type="submit" onClick={this.setMale}> Male </Button>
              <Button type="submit" onClick={this.setFemale}> Female </Button>
              <Button style={{width:'45%', display: 'absolute', left: '50%', transform: 'translate(60%, -10%)'}} type="submit"> Create Outfit </Button>
            </Form>

            <br/>

          {this.state &&  <Card style={{border:'hidden'}}>
              <Card.Body>
                {this.state.city && this.state.country && <Card.Title> {this.state.city}, {this.state.country}</Card.Title>}
                <Card.Text>
                {this.state.temperature && <p> Temperature: {Math.round(this.state.temperature)} &#8457; </p> }
                {this.state.humidity && <p> Humidity: {this.state.humidity} </p> }
                {this.state.description && <p> Description: {this.state.description} </p> }
                {this.state.error && <Alert variant='danger'> Error: {this.state.error} </Alert> }
                {this.state.temperature && this.state.temperature  > 75 && <h3>Wear something comfortable! It's {Math.round(this.state.temperature)} &#8457;</h3>}
                {this.state.temperature && this.state.temperature  >= 50 && this.state.temperature  <= 75 && <h3> Wear something that keeps you warm! It's {Math.round(this.state.temperature)} &#8457; </h3>}
                {this.state.temperature && this.state.temperature  < 50 && <h3> Stay Warm! It's {Math.round(this.state.temperature)} &#8457; </h3>}
                </Card.Text>
              </Card.Body>
            </Card>
          }
          </div>
            <div>
              {outfit}
            </div>
          </div>
      );
    }
  }
