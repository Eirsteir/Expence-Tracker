// Main content for landing page

import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import './Hero.css';

const Hero = ({ onRouteChange }) => {
  return (
    <div id="header-container">
        <Typography variant="display3" id="header">
          MyExpences
        </Typography>
        <Typography id="main-subheader" variant="display1">
          Start tracking your expences today
        </Typography>
      <div id="buttonDiv">
        <Button id="register-now-btn" color="primary" variant="raised" onClick={() => onRouteChange('register')}>
          REGISTER NOW
        </Button>
        </div>
    </div>
  );
}

export default Hero;