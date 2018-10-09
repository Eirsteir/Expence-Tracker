import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import "./Info.css";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  subheader: {
    color: theme.palette.text.secondary
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

    return (
      <div className={classes.root}>
        <div className="profile-name-container">{name}</div>
        <div id="info-header">
          <h1 style={{ fontWeight: 300, letterSpacing: 2 }}>INFO</h1>
        </div>
        <div id="profile-info-container">
          <Grid container spacing={0} id="profile-info">
            <Grid item xs={6}>
              <p>Email</p>
            </Grid>
            <Grid item xs={6}>
              <p className={classes.subheader}>{email}</p>
            </Grid>
            <Grid item xs={6}>
              <p>Date joined</p>
            </Grid>
            <Grid item xs={6}>
              <p className={classes.subheader}>
                {date.toLocaleString("en-us", options)}
              </p>
            </Grid>
            <Grid item xs={6}>
              <p>Currency</p>
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
