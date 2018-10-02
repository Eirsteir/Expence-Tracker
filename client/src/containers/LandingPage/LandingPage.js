import React, { Component } from 'react';
import Navigation from '../../components/Navigation/Navigation';
import Background from '../../components/Background/Background';
import Hero from '../../components/Hero/Hero';

import '../App.css';

class LandingPage extends Component {


  render() {
    return (
      <div>
        <Navigation onRouteChange={this.props.onRouteChange} />
        <Hero onRouteChange={this.props.onRouteChange}/>
        <Background />
      </div>
    );
  }
}

export default LandingPage;
