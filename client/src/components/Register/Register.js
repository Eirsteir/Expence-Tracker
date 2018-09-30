import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';


const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
    margin: '1em'
  },
  paper: {
    width: '17em',
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: '2em'
  },
  button: {
    marginTop: '2em'
  },
  control: {
    padding: '.5em'
  }
});

class Register extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        email: '',
        password: '',
        name: '',
        isLoading: false,
        showPassword: false,
        errorMessage: ''
      }
    }

  toggleLoading = () => {
    this.setState((prevState, props) => ({
      isLoading: !prevState.isLoading
    }));
  }

  onEmailChange = (event) => {
    this.setState({email: event.target.value})
  }

  onNameChange = (event) => {
    this.setState({name: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({password: event.target.value})
  }

  handleRegister = () => {
    this.toggleLoading();
    fetch(`/register`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name
      })
    })
    .then(response => response.json())
    .then(user => {
      this.toggleLoading();
      if (user._id) {
        this.props.loadUser(user);
        this.props.onRouteChange('home');
      }
    })
  }

  onKeyDown = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.handleRegister();
    }
  }

  onSubmit = event => {
    event.preventDefault();
    event.stopPropagation();
    this.handleRegister();
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };


  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.paper} >
        <Typography variant="headline" component="h3" className={classes.control} style={{display: 'flex', justifyContent: 'center', backgroundColor: '#1769aa', color: '#fff'}}>
          Register
        </Typography>
        <form onKeyDown={this.onKeyDown} onSubmit={this.onSubmit} className={classes.form}>
          <TextField
            id="input-name"
            label="Full name"
            autoComplete="name"
            className={classes.textField}
            margin="normal"
            onChange={this.onNameChange}
          />
          <TextField
            id="input-email"
            label="Email address"
            autoComplete="email"
            className={classes.textField}
            margin="normal"
            onChange={this.onEmailChange}
          />
          <FormControl className={classes.textField}>
            <InputLabel htmlFor="adornment-password">Password</InputLabel>
            <Input
              id="adornment-password"
              type={this.state.showPassword ? 'text' : 'password'}
              value={this.state.password}
              onChange={this.onPasswordChange}
              autoComplete="current-password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={this.handleClickShowPassword}
                  >
                    {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Button
            onClick={this.onSubmitRegister}
            className={classes.button}
            variant="raised"
            label="Submit"
            type="submit"
            color="primary"
          >
            {
              this.state.isLoading ? <CircularProgress style={{color: '#fff'}} size={20}/> : 'Register'
            }
          </Button>
        </form>
      </Paper>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);
