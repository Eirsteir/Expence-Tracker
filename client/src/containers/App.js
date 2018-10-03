import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import CircularProgress from '@material-ui/core/CircularProgress';

import Navigation from '../components/Navigation/Navigation';
import Expences from '../components/Expences/Expences';
import Signin from '../components/Signin/Signin';
import Register from '../components/Register/Register';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import Background from '../components/Background/Background';
import Hero from '../components/Hero/Hero';

import './App.css';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const initialState =  {
  route: 'signin',
  isSignedIn: false,
  user: {
    _id: '',
    name: '',
    email: '',
    age: '',
    joined: '',
    expences: [],
    tags: []// push to availableTags in componentDidMount
  },
  isLoading: false
}

// Performance cost? why? do you really need this? bruh what about tenfolds of looping/mapping in expences?
const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: {
      main: '#009688',
    },
  }
});

const styles = {
  loading: {
    position: 'absolute',
    top: '50',
    left: '50',
    width: '100vw',
    height:'100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '99999',
    backgroundColor: 'rgba(0,0,0, 0.5)'
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  componentDidMount() {
    const token = window.sessionStorage.getItem('token');
    if (token) {
      this.toggleLoading();
      fetch(`/signin`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token // 'Bearer '
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data && data.id) {
          fetch(`/profile/${data.id}`, {
            method: 'get',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token
            }
          })
          .then(response => response.json())
          .then(user => {
            if (user && user.email) {
              this.toggleLoading();
              this.loadUser(user);
              this.onRouteChange('home');
            }
          })
          .catch(console.log)
        }
      })
      .catch(console.log)
    }
  }

  onSignout = () => {
    const token = window.sessionStorage.getItem('token');

    fetch(`/signout`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    })
      .then(resp => {
        if (resp.status === 200 || resp.status === 304) {
          window.sessionStorage.removeItem('token')
          return this.onRouteChange('signin')
        }
      })
  }

  toggleLoading = () => {
    this.setState((prevState, props) => ({
      isLoading: !prevState.isLoading
    }));
  }

  onRouteChange = (route) => {
    if (route === 'signin') {
      return this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({ route: route });
  }

  // Acceps user object or user tags array -- find out which function passes array
  loadUser = (user) => {
    // check if user object or just tags are recieved
    if (user._id) {
      this.setState({ user });
    }
  }

// Bundle expences, currentTag and availableTags in one object?
// Move expences up a level?
  render() {
    const { route, isSignedIn, user } = this.state;

    return (
      <div className="App">
      <MuiThemeProvider theme={theme}>

      {
        this.state.isLoading && <div style={styles.loading}>
            <CircularProgress size={80} color="primary" />
          </div>
      }
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} onSignout={this.onSignout}/>

        <ErrorBoundary>
        { route === 'home'
          ? <Expences
            loadUser={this.loadUser}
            user={user}
          />
          : ( route === 'register'
              ? <div id="landing-page-container">
                  <Hero onRouteChange={this.onRouteChange} />
                  <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
                </div>
              :  <div id="landing-page-container">
                  <Hero onRouteChange={this.onRouteChange} />
                  <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
                </div>
            )
        }
        </ErrorBoundary>
        </MuiThemeProvider>
        <Background />
      </div>
    );
  }
}

export default App;

// TODO:
  // - Add circleci
  // - Add twilio
  //   - get phonenumber from register --> db
  //   - Move requests to AWS Lambda
  // - what about currencies? https://codesandbox.io/s/k3rkq27y07
  // - Fix Total amount: make it a sum and always last in Card
  // - Redux
  // - Clean up and refactor code
  // - Improve date sorting by week, month and day
  // - Improve display for empty Cards aka no expences
  // - Add View individual expence/history
  // - (Security)
  // - Add option to delete expence

// API_PORT=3001
// CLIENT_PORT=3000
