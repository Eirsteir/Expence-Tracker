import React, { Component } from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

import Navigation from "../../components/Navigation/Navigation";
import Main from "../Main/Main";

import "./App.css";

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
  const { whyDidYouUpdate } = require("why-did-you-update");
  whyDidYouUpdate(React);
}

const App = props => (
  <div>
    <Navigation />
    <Main />
  </div>
);

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
