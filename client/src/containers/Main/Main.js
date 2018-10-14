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

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

import Expences from "../Expences/Expences";
import Hero from "../../components/Hero/Hero";
import Register from "../../components/Register/Register";
import Login from "../../components/Login/Login";
import Info from "../../components/Profile/Info"; // change name

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
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "99999",
    backgroundColor: "rgba(0,0,0, 0.5)"
  }
};

class Main extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }

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
                  this.onRouteChange("home");
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

  onRouteChange = route => {
    if (route === "signin") {
      return this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  // Acceps user object or user tags array -- find out which function passes array
  loadUser = user => {
    // check if user object or just tags are recieved
    if (user._id) {
      this.setState({ user });
    }
  };

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Switch>
          <Route exact path="/" component={Hero} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/home" component={Expences} />
          <Route path="/profile" component={Info} />
        </Switch>
      </MuiThemeProvider>
    );
  }
}

export default Main;

// const extraProps = { color: 'red' }
// <Route path='/page' render={(props) => (
//   <Page {...props} data={extraProps}/>
// )}/>

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
