// Render routes in here

// ROUTES:
// - / --> landingpage w/register
// - /login --> the login page
// - /home --> homepage (Expences.js)
// - /profile --> users profile
// - opt /edit-profile ?

import React from "react";
// objects match, location, history
import { Switch, Route } from "react-router-dom";
import Loadable from "react-loadable";

import CircularProgress from "@material-ui/core/CircularProgress";

// import LandingPage from "../LandingPage/LandingPage";
// import Expences from "../Expences/Expences";
// import Register from "../../components/Register/Register";
// import Login from "../../components/Login/Login";
// import Info from "../../components/Profile/Info"; // change name

const Loading = () => (
  <div style={styles.loading}>
    <CircularProgress size={80} color="primary" />
  </div>
);

const Home = Loadable({
  loader: () => import("../Dashboard/Dashboard"),
  loading: Loading
});

const LandingPage = Loadable({
  loader: () => import("../LandingPage/LandingPage"),
  loading: Loading
});

const Login = Loadable({
  loader: () => import("../../components/Login/Login"),
  loading: Loading
});

const Register = Loadable({
  loader: () => import("../../components/Register/Register"),
  loading: Loading
});

const Profile = Loadable({
  loader: () => import("../../components/Profile/Info"),
  loading: Loading
});

const styles = {
  loading: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "99999",
    backgroundColor: "rgba(0,0,0, 0.5)"
  }
};

class Main extends React.Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={props => (
            <LandingPage
              {...props}
              loadUser={this.props.loadUser}
              toggleSigninState={this.props.toggleSigninState}
            />
          )}
        />
        <Route
          exact
          path="/login"
          render={props => (
            <Login
              {...props}
              loadUser={this.props.loadUser}
              toggleSigninState={this.props.toggleSigninState}
            />
          )}
        />
        <Route
          exact
          path="/register"
          render={props => (
            <Register
              {...props}
              loadUser={this.props.loadUser}
              toggleSigninState={this.props.toggleSigninState}
            />
          )}
        />
        <Route
          exact
          path="/home"
          render={props => (
            <Home
              {...props}
              isSignedIn={this.props.isSignedIn}
              user={this.props.user}
              loadUser={this.props.loadUser}
            />
          )}
        />
        <Route
          exact
          path="/profile"
          render={props => (
            <Profile
              {...props}
              isSignedIn={this.props.isSignedIn}
              name={this.props.user.name}
              email={this.props.user.email}
              dateJoined={this.props.user.joined}
              currency={this.props.user.currency}
            />
          )}
        />
      </Switch>
    );
  }
}

export default Main;
