// Main content for landing page

import React from "react";
import { Link } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import "./Hero.css";

const Hero = ({ onRouteChange }) => {
  return (
    <Grid
      container
      justify="space-around"
      direction="column"
      spacing={32}
      wrap="wrap"
      id="main-container"
    >
      <Grid item>
        <Typography
          variant="display3"
          style={{ color: "#fff", fontWeight: "bold" }}
        >
          MyExpences
        </Typography>
      </Grid>

      <Grid item id="text-container">
        <Typography
          variant="display1"
          style={{ color: "#fff", fontWeight: 300, fontSize: "1.9rem" }}
        >
          Start tracking your expences &mdash; <br /> with myExpences
        </Typography>
      </Grid>

      <Grid item>
        <Button
          color="secondary"
          variant="raised"
          style={{ height: "4rem", width: "10rem" }}
        >
          <Link
            to="/register"
            style={{
              textDecoration: "none",
              color: "#fff",
              textTransform: "capitalize",
              fontSize: "1rem",
              letterSpacing: 1
            }}
          >
            Register now
          </Link>
        </Button>
      </Grid>
    </Grid>
  );
};

export default Hero;
