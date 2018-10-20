import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import FormHelperText from "@material-ui/core/FormHelperText";
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
  email: ""
};

class ChangeEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowEqual(this.props, nextProps, this.state, nextState);
  }

  handleChange = event => this.setState({ email: event.target.value });

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
        <div>Change email</div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "flex-end"
          }}
        >
          <TextField
            id="input-new-tag"
            label="New email"
            margin="normal"
            onChange={this.handleChange}
            value={this.state.email}
            InputProps={{
              classes: { input: classes.gray }
            }}
            InputLabelProps={{
              className: classes.gray
            }}
          />
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

ChangeEmail.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ChangeEmail);
