import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

import Navigation from "../../components/Navigation/Navigation";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";
import Main from "../Main/Main";

import "./App.css";

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
  const { whyDidYouUpdate } = require("why-did-you-update");
  whyDidYouUpdate(React);
}

// Performance cost? Look for alternatives
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1769aa"
    },
    secondary: {
      main: "#009688"
    }
  }
});

const styles = {
  loading: {
    position: "absolute",
    top: "50",
    left: "50",
    width: "100vw",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "99999",
    backgroundColor: "rgba(0,0,0, 0.5)"
  }
};

const initialState = {
  isSignedIn: false,
  user: {
    _id: "",
    name: "",
    email: "",
    age: "",
    joined: "",
    expences: [],
    tags: [],
    currency: ""
  },
  isLoading: false
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  toggleSigninState = () => {
    this.setState(prevState => ({
      ...prevState,
      isSignedIn: !prevState.isSignedIn
    }));
  };

  componentDidMount() {
    const token = window.localStorage.getItem("token");
    if (token) {
      this.toggleLoading();
      fetch(`/signin`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: token // 'Bearer '
        }
      })
        .then(response => {
          if (response.status === 400) {
            return this.toggleLoading();
          }
          return response.json();
        })
        .then(data => {
          if (data && data.id) {
            fetch(`/profile/${data.id}`, {
              method: "get",
              headers: {
                "Content-Type": "application/json",
                Authorization: token
              }
            })
              .then(response => response.json())
              .then(user => {
                this.toggleLoading();
                if (user && user.email) {
                  this.loadUser(user);
                  this.setState({ isSignedIn: true });
                  return this.props.history.push("/home");
                }
              })
              .catch(err => {
                console.log(err);
                this.toggleLoading();
              });
          }
        })
        .catch(err => {
          console.log(err);
          this.toggleLoading();
        });
    }
  }

  toggleLoading = () => {
    this.setState((prevState, props) => ({
      isLoading: !prevState.isLoading
    }));
  };

  // Acceps user object or user tags array -- find out which function passes array
  loadUser = user => {
    // check if user object or just tags are recieved
    if (user._id) {
      this.setState({ user });
    }
  };

  render() {
    const { isSignedIn } = this.state;

    return (
      <div>
        {this.state.isLoading && (
          <div style={styles.loading}>
            <CircularProgress size={80} color="primary" />
          </div>
        )}
        <Navigation
          isSignedIn={isSignedIn}
          toggleSigninState={this.toggleSigninState}
        />
        <MuiThemeProvider theme={theme}>
          <ErrorBoundary>
            <Main
              isSignedIn={isSignedIn}
              user={this.state.user}
              loadUser={this.loadUser}
              toggleSigninState={this.toggleSigninState}
            />
          </ErrorBoundary>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default withRouter(App);

// Delete CardList? Badly planned and is a mess

// TODO:
// - Add twilio?
//   - Move requests to AWS Lambda
// - Redux?
// - Clean up and refactor code
// - (Security)
// - AWS: serverless, dynamoDB, Lambda, S3, hosting? redis?
// - Add goals/budgets
// - Terms of service
// - Cookie consent
// - Privacy policy?

// API_PORT=3001
// CLIENT_PORT=3000

// ADD REACT ROUTER
