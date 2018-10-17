import React from "react";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { shallowEqual } from "shouldcomponentupdate-children";

class AddNewTagModal extends React.Component {
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
            placeholder="Tag"
            margin="normal"
            onChange={this.handleChange}
            value={this.state.tag}
          />
          <Button
            variant="text"
            size="small"
            color="secondary"
            style={{ fontSize: "1rem", marginTop: "1.5em" }}
            onClick={this.onButtonClick}
          >
            Add
          </Button>
        </div>
      </div>
    );
  }
}

export default AddNewTagModal;
