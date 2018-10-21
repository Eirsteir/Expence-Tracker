import React from "react";
import Hero from "../../components/Hero/Hero";
import Register from "../../components/Register/Register";
import Background from "../../components/Background/Background";

import { useShallowEqual } from "shouldcomponentupdate-children";

import Grid from "@material-ui/core/Grid";
import "./LandingPage.css";

class LandingPage extends React.Component {
  render() {
    return (
      <Grid
        container
        justify="center"
        alignItems="baseline"
        id="landing-page-container"
      >
        <Grid item md={6}>
          <Hero />
        </Grid>
        <Grid item md={6} id="signin-container">
          <Register
            loadUser={this.props.loadUser}
            toggleSigninState={this.props.toggleSigninState}
          />
        </Grid>
        <Background />
      </Grid>
    );
  }
}

LandingPage = useShallowEqual(LandingPage);
export default LandingPage;
