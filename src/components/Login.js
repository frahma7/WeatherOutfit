import React, { Component } from 'react';
import {Form, Button, Header} from 'react-bootstrap';
import fire from '../config/Fire';


export default class Login extends React.Component{
  constructor(props){
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.state ={
      email:'',
      password:''
    }
  }

  login(e){
    e.preventDefault();
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then((u)=>{
      console.log(u);
      })
    .catch((error)=>{
      alert(error);
    });
  }

  signup(e){
    e.preventDefault();
    fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .catch((error)=>{
      alert(error);
    });
  }

  handleChange(e){
    this.setState({[e.target.name]: e.target.value})
  }
    render() {
    return (
    <Form style={{position:'absolute', top:'50%', left:'50%', transform: 'translate(-50%, -50%)'}}>
      <h1>Welcome to Weather Wardrobe!</h1>
      <h2 style={{textAlign: 'center'}}>Sign Up or Log In</h2>
      <Form.Group controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control value={this.state.email} onChange={this.handleChange} type="email" name="email" placeholder="Enter email" />

        <Form.Text className="text-muted">
          We'll always share your email with everyone else.
        </Form.Text>

      </Form.Group>

      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control defaultValue={this.state.password} onChange={this.handleChange} type="password" name="password" placeholder="Password" />
      </Form.Group>

      <Button onClick={this.login} style={{width:'45%', marginLeft:'10px'}} variant="primary" type="submit"> Login </Button>
      <Button onClick={this.signup}  style={{width: '45%', marginLeft:'5px'}} variant="success" type="submit"> Sign Up </Button>
    </Form>
    );
  }
}
