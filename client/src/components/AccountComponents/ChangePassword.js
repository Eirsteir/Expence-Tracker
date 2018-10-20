import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { shallowEqual } from "shouldcomponentupdate-children";

const styles = {
  gridItemContainer: {
    backgroundColor: "#343b64",
    padding: "1.2rem",
    border: "none",
    borderRadius: 5
  },
  gray: {
    color: "#c3cdd0"
  }
};

const initialState = {
  password: "",
  confirmPassword: ""
};

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowEqual(this.props, nextProps, this.state, nextState);
  }

  handleChange = (event, name) => this.setState({ [name]: event.target.value });

  // onButtonClick = () => {
  //   const { tag } = this.state;
  //   if (tag.length === 0) {
  //     return false;
  //   }
  //   fetch(`/add-custom-tag`, {
  //     method: "post",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: window.localStorage.getItem("token")
  //     },
  //     body: JSON.stringify({
  //       _id: this.props.user._id,
  //       tag: tag
  //     })
  //   })
  //     .then(response => response.json())
  //     .then(user => {
  //       if (user) {
  //         this.setState({ tag: "" });
  //         this.props.loadUser(user);
  //       }
  //     })
  //     .catch(err => console.log);
  // };

  render() {
    const { classes } = this.props;
    return (
      <div style={styles.gridItemContainer}>
        <div>Change password</div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "flex-end"
          }}
        >
          <div>
            <TextField
              id="input-new-password"
              label="New password"
              margin="normal"
              onChange={() => this.handleChange("password")}
              value={this.state.password}
              InputProps={{
                classes: { input: classes.gray }
              }}
              InputLabelProps={{
                className: classes.gray
              }}
            />
            <TextField
              id="input-confirm-new-password"
              label="Confirm password"
              margin="normal"
              onChange={() => this.handleChange("confirmPassword")}
              value={this.state.confirmPassword}
              InputProps={{
                classes: { input: classes.gray }
              }}
              InputLabelProps={{
                className: classes.gray
              }}
            />
          </div>
          <Button
            variant="text"
            size="small"
            color="secondary"
            style={{ marginTop: "1.5rem" }}
            onClick={this.onButtonClick}
          >
            Update
          </Button>
        </div>
      </div>
    );
  }
}

ChangePassword.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ChangePassword);
