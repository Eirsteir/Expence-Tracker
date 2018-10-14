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
import Expences from "../Expences/Expences";
import Hero from "../../components/Hero/Hero";
import Register from "../../components/Register/Register";
import Login from "../../components/Login/Login";
import Info from "../../components/Profile/Info";

const Main = () => (
  <Switch>
    <Route exact path="/" component={Hero} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/home" component={Expences} />
    <Route path="/profile" component={Info} />
  </Switch>
);

export default Main;

// const extraProps = { color: 'red' }
// <Route path='/page' render={(props) => (
//   <Page {...props} data={extraProps}/>
// )}/>
