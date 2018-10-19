import React from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import "./Info.css";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  infoTitle: {
    color: "rgba(255,255,255,.8)"
  },
  subheader: {
    color: "#c3cdd0"
  }
});

const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
  weekday: "short"
};

class ProfileInfo extends React.Component {
  render() {
    const { classes, name, email, dateJoined, currency } = this.props;
    const date = new Date(dateJoined);

    if (!this.props.isSignedIn) {
      return <Redirect to="/" />;
    }

    return (
      <div className={classes.root}>
        <div className="profile-name-container">{name}</div>
        <div id="info-header">
          <h2 style={{ fontWeight: 300, letterSpacing: 3 }}>INFO</h2>
        </div>
        <div id="profile-info-container">
          <Grid container spacing={0} id="profile-info">
            <Grid item xs={6}>
              <p className={classes.infoTitle}>Email</p>
            </Grid>
            <Grid item xs={6}>
              <p className={classes.subheader}>{email}</p>
            </Grid>
            <Grid item xs={6}>
              <p className={classes.infoTitle}>Date joined</p>
            </Grid>
            <Grid item xs={6}>
              <p className={classes.subheader}>
                {date.toLocaleString("en-us", options)}
              </p>
            </Grid>
            <Grid item xs={6}>
              <p className={classes.infoTitle}>Currency</p>
            </Grid>
            <Grid item xs={6}>
              <p className={classes.subheader}>{currency}</p>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

ProfileInfo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileInfo);
