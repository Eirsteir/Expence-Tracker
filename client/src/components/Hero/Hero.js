// Main content for landing page

import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import blue from '@material-ui/core/colors/blue';

const styles = {
  header: {
    marginTop: '2.5em',
    marginLeft: '3em'
  },
  subHeader: {
    color: '#fff',
    marginTop: '1em',
    marginRight: '40vw'
  },
  buttonDiv: {
    width: '100vw',
    height: '10vw',
    position: 'absolute',
    bottom: '0',
    left: '0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: blue,
    fontSize: '1rem'
  }
}

const Hero = ({ onRouteChange }) => {
  return (
    <div>
      <Typography variant="display3" style={styles.header}>
        My Expences
      </Typography>
      <Typography variant="display1" align="right" style={styles.subHeader}>
        Start Tracking your expences today
      </Typography>
      <div style={styles.buttonDiv}>
        <Button color="primary" variant="raised" style={styles.button} onClick={() => onRouteChange('signin')}>
          REGISTER NOW
        </Button>
      </div>
    </div>
  );
}

export default Hero;
