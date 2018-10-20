import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { shallowEqual } from "shouldcomponentupdate-children";

const styles = {
  gray: {
    color: "#c3cdd0"
  }
};

class AddTagForm extends React.Component {
  state = {
    expanded: false,
    tag: ""
  };

  shouldComponentUpdate(nextProps, nextState) {
    return shallowEqual(this.props, nextProps, this.state, nextState);
  }

  handleChange = event => {
    this.setState({ tag: event.target.value });
  };

  handleExpandChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  // add tag
  onButtonClick = () => {
    const { tag } = this.state;
    if (tag.length === 0) {
      return false;
    }
    fetch(`/add-custom-tag`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.localStorage.getItem("token")
      },
      body: JSON.stringify({
        _id: this.props.user._id,
        tag: tag
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user) {
          this.setState({ tag: "" });
          this.props.loadUser(user);
        }
      })
      .catch(err => console.log);
  };

  render() {
    const { expanded } = this.state;
    const { classes } = this.props;
    return (
      <div
        style={{ backgroundColor: "#343b64", padding: "1rem", color: "#fff" }}
      >
        <div>Add New Tag</div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around"
          }}
        >
          <TextField
            id="input-new-tag"
            label="Tag"
            margin="normal"
            onChange={this.handleChange}
            value={this.state.tag}
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
            Add
          </Button>
        </div>
      </div>
    );
  }
}

AddTagForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddTagForm);
