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
      <div id="landing-page-container">
        <div id="hero-img-container">
          <div>
            <Hero />
          </div>
          <img
            src="/screenshot.jpg"
            className="hero-image"
            sizes="(max-width: 479px) 80vw, (max-width: 991px) 70vw, 100vw"
          />
        </div>
        {/*<Register
            loadUser={this.props.loadUser}
            toggleSigninState={this.props.toggleSigninState}
          />*/}
        <Background />
      </div>
    );
  }
}

LandingPage = useShallowEqual(LandingPage);
export default LandingPage;
