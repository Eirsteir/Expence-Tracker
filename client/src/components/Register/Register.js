import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
    margin: "1em"
  },
  paper: {
    marginTop: "5rem",
    marginBottom: "3rem",
    width: "17em"
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: "2em"
  },
  button: {
    marginTop: "2em"
  },
  control: {
    padding: ".5em"
  },
  menu: {
    width: 200
  }
});

const currencies = [
  {
    value: "USD",
    label: "$"
  },
  {
    value: "EUR",
    label: "€"
  },
  {
    value: "BTC",
    label: "฿"
  },
  {
    value: "JPY",
    label: "¥"
  },
  {
    value: "GBP",
    label: "£"
  },
  {
    value: "NOK",
    label: "kr"
  }
];

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      currency: "EUR",
      isLoading: false,
      errorMessage: ""
    };
  }

  toggleLoading = () => {
    this.setState((prevState, props) => ({
      isLoading: !prevState.isLoading
    }));
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleRegister = () => {
    this.toggleLoading();
    fetch(`/register`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name,
        currency: this.state.currency
      })
    })
      .then(response => response.json())
      .then(user => {
        this.toggleLoading();

        if (user._id) {
          this.props.loadUser(user);
          this.props.history.push("/home");
        } else {
          this.setState({ errorMessage: user });
        }
      });
  };

  onKeyDown = event => {
    if (event.key === "Enter") {
      event.preventDefault();
      this.handleRegister();
    }
  };

  onSubmit = event => {
    event.preventDefault();
    event.stopPropagation();
    this.handleRegister();
  };

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.paper}>
        <Typography
          variant="headline"
          component="h3"
          className={classes.control}
          style={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#1769aa",
            color: "#fff"
          }}
        >
          Register
        </Typography>
        <form
          onKeyDown={this.onKeyDown}
          onSubmit={this.onSubmit}
          className={classes.form}
        >
          <TextField
            id="input-name"
            label="Full name"
            autoComplete="name"
            className={classes.textField}
            margin="normal"
            onChange={this.handleChange("name")}
          />
          <TextField
            id="input-email"
            label="Email address"
            autoComplete="email"
            className={classes.textField}
            margin="normal"
            onChange={this.handleChange("email")}
          />
          <FormControl className={classes.textField}>
            <TextField
              id="adornment-password"
              label="Password"
              type={this.state.showPassword ? "text" : "password"}
              value={this.state.password}
              onChange={this.handleChange("password")}
              autoComplete="current-password"
              helperText="Password must be at least 8 characters long"
            />
          </FormControl>
          <TextField
            id="standard-select-currency"
            select
            label="Select"
            className={classes.textField}
            value={this.state.currency}
            onChange={this.handleChange("currency")}
            SelectProps={{
              MenuProps: {
                className: classes.menu
              }
            }}
            helperText="Please select your currency"
            margin="normal"
          >
            {currencies.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          {this.state.errorMessage && (
            <Typography
              component="p"
              style={{
                display: "flex",
                justifyContent: "center",
                color: "red"
              }}
            >
              {this.state.errorMessage}
            </Typography>
          )}

          <Button
            onClick={this.onSubmitRegister}
            className={classes.button}
            variant="raised"
            label="Submit"
            type="submit"
            color="primary"
          >
            {this.state.isLoading ? (
              <CircularProgress style={{ color: "#fff" }} size={20} />
            ) : (
              "Register"
            )}
          </Button>
        </form>
      </Paper>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Register);
