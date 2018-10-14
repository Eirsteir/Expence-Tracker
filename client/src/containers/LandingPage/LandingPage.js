import React from "react";
import Hero from "../../components/Hero/Hero";
import Register from "../../components/Register/Register";
import Background from "../../components/Background/Background";

import "./LandingPage.css";

class LandingPage extends React.Component {
  render() {
    return (
      <div id="landing-page-container">
        <Hero />
        <div id="register-container">
          <Register
            loadUser={this.props.loadUser}
            toggleSigninState={this.props.toggleSigninState}
          />
        </div>
        <Background />
      </div>
    );
  }
}

export default LandingPage;
