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
import Hero from "../../components/Hero/Hero";
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
            <LandingPage {...props} loadUser={this.props.loadUser} />
          )}
        />
        <Route
          exact
          path="/login"
          render={props => <Login {...props} loadUser={this.props.loadUser} />}
        />
        <Route exact path="/register" component={Register} />
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
            <Info {...props} isSignedIn={this.props.isSignedIn} />
          )}
        />
        <Route path="/profile" component={Info} />
      </Switch>
    );
  }
}

export default Main;

// class App extends Component {
//
//
//
//   render() {
//     const { route, isSignedIn, user } = this.state;
//
//     return (
// <div className="App">
//   <MuiThemeProvider theme={theme}>
//     {this.state.isLoading && (
//       <div style={styles.loading}>
//         <CircularProgress size={80} color="primary" />
//       </div>
//     )}
//     <Navigation
//       isSignedIn={isSignedIn}
//       onRouteChange={this.onRouteChange}
//       onSignout={this.onSignout}
//     />
//
//     <ErrorBoundary>
//       {route === "home" ? (
//         <Expences loadUser={this.loadUser} user={user} />
//       ) : route === "register" ? (
//         <div id="landing-page-container">
//           <Hero onRouteChange={this.onRouteChange} />
//           <Register
//             onRouteChange={this.onRouteChange}
//             loadUser={this.loadUser}
//           />
//           <Background />
//         </div>
//       ) : route === "profile" ? (
//         <ProfileInfo
//           name={user.name}
//           email={user.email}
//           dateJoined={user.joined}
//           currency={user.currency}
//         />
//       ) : (
//         <div id="landing-page-container">
//           <Hero onRouteChange={this.onRouteChange} />
//
//           <div id="signin-container">
//             <Signin
//               onRouteChange={this.onRouteChange}
//               loadUser={this.loadUser}
//             />
//           </div>
//           <Background />
//         </div>
//       )}
//     </ErrorBoundary>
//   </MuiThemeProvider>
// </div>
//     );
//   }
// }
//
// export default Ap
