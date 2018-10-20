// Main content for landing page

import React from "react";
import { Link } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import "./Hero.css";

const Hero = ({ onRouteChange }) => {
  return (
    <div>
      <Grid
        container
        justify="space-around"
        direction="column"
        spacing={16}
        wrap="wrap"
        id="main-container"
      >
        <Grid item>
          <Typography
            variant="display3"
            style={{ color: "#fff", fontWeight: 300 }}
          >
            MyExpences
          </Typography>
        </Grid>

        <Grid item id="text-container">
          <Typography
            variant="display1"
            style={{ color: "#fff", fontWeight: 300 }}
          >
            Start tracking your expences today
          </Typography>
        </Grid>

        <Grid item>
          <Button color="secondary" variant="raised">
            <Link
              to="/register"
              style={{ textDecoration: "none", color: "#fff" }}
            >
              Register now
            </Link>
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Hero;
