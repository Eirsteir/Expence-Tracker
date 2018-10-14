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

import LandingPage from "../LandingPage/LandingPage";
import Expences from "../Expences/Expences";
import Register from "../../components/Register/Register";
import Login from "../../components/Login/Login";
import Info from "../../components/Profile/Info"; // change name

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
            <Expences
              {...props}
              isSignedIn={this.props.isSignedIn}
              user={this.props.user}
            />
          )}
        />
        <Route
          exact
          path="/profile"
          render={props => (
            <Info
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
