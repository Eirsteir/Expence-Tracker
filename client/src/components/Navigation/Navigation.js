import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import LongMenu from './LongMenu';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
    fontWeight: 300
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const Navigation = ({ classes, isSignedIn, onRouteChange, onSignout }) => {
  if (isSignedIn) {
    return (
      <div className={classes.root}>
        <AppBar position="fixed" style={{backgroundImage: 'linear-gradient(89deg, rgb(23, 105, 170) 0%, #1769aa 15%, #009688 75%)'}}>
          <Toolbar>
            <Typography variant="title" color="inherit" className={classes.grow}>
              MyExpences
            </Typography>
            <Button color="inherit" onClick={() => onSignout()}>Logout</Button>
            <LongMenu onRouteChange={onRouteChange} onSignout={onSignout} />
          </Toolbar>
        </AppBar>
      </div>
    )
  } else {
    return (
      <div className={classes.root}>
        <AppBar position="static" style={{backgroundImage: 'linear-gradient(89deg, rgb(23, 105, 170) 0%, #1769aa 15%, #009688 75%)'}}>
          <Toolbar>
            <Typography variant="title" color="inherit" className={classes.grow}>
              MyExpences
            </Typography>
            <Button color="inherit" onClick={() => onRouteChange('signin')}>Login</Button>
            <Button color="inherit" onClick={() => onRouteChange('register')}>Register</Button>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigation);
