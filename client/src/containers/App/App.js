import React, { Component } from "react";
import Navigation from "../../components/Navigation/Navigation";
import Main from "../Main/Main";

import "./App.css";

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
  const { whyDidYouUpdate } = require("why-did-you-update");
  whyDidYouUpdate(React);
}

const initialState = {
  isSignedIn: true
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  toggleSigninState = () =>
    this.setState(prevState => ({ ...prevState, isSignedIn: !prevState }));

  render() {
    const { isSignedIn } = this.state;
    return (
      <div>
        <Navigation
          isSignedIn={isSignedIn}
          toggleSigninState={this.toggleSigninState}
        />
        <Main />
      </div>
    );
  }
}

export default App;

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
