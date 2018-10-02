import React, { Component } from 'react';
import App from '../App';
import LandingPage from '../LandingPage/LandingPage';

const initialState ={
  route: 'landingPage'
}
class MainPage extends Component {
  constructor() {
    super();
    this.state = initialState
  }

  onRouteChange = route => route === 'signin' ? this.setState({ route: 'signin' }) : this.setState(initialState);

  render() {
    return this.state.route === 'signin'
    ? <App />
    : <LandingPage onRouteChange={this.onRouteChange}/>

  }
}

export default MainPage;
