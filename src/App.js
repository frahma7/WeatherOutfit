import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './Home';
import  WeatherOutfit from './WeatherOutfit';
import { Layout } from './components/Layout';
import { Menu } from './components/Navbar';
import Login from './Login';


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
        // localStorage.setItem('user', user.uid);
      }
      else{
        this.setState({user: null});
        // localStorage.removeItem('user');
      }
    });
  }

  render() {
    return (
      <React.Fragment>
        <Router>
          <Menu />
          <Layout>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/weatherfit" component={WeatherOutfit} />
              <Route path="/login" component={Login}/>
            </Switch>
          </Layout>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
