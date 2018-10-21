import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

import SnackBar from "../Snackbar/SnackBar";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    flexDirection: "row"
  },
  formControl: {
    marginBottom: "1rem",
    minWidth: 120,
    maxWidth: 300
  },
  textField: {
    flexBasis: 200
  },
  paper: {
    maxWidth: "30em",
    padding: "1em"
  },
  inputColor: {
    color: "#c3cdd0"
  }
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      height: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      backgroundColor: "#26294c"
    }
  }
};

const initialState = {
  amount: "",
  tag: ""
};

class AddExpenceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  handleInputChange = event => {
    const amount = event.target.value;

    // input field type number: ugly but gets the job done
    return this.setState({ amount: Number(amount) });
  };

  handleSelectChange = event => {
    return this.setState({ tag: event.target.value });
  };

  // Add expence
  onButtonClick = () => {
    if (this.state.tag === "") {
      return false;
    }
    fetch(`/add-expence`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.localStorage.getItem("token")
      },
      body: JSON.stringify({
        _id: this.props._id,
        tag: this.state.tag,
        amount: this.state.amount
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user && user.email) {
          this.setState(initialState);
          this.props.loadUser(user);
        }
      })
      .catch(err => console.warn("unable to add expence"));
  };

  render() {
    const { classes, tags, currency } = this.props;

    return (
      <div
        style={{
          backgroundColor: "#343b64",
          padding: "1rem",
          color: "#fff",
          border: "none",
          borderRadius: 5
        }}
      >
        <div>Add new expence</div>
        <div className={classes.root}>
          <FormControl className={classes.formControl}>
            <InputLabel style={{ color: "#c3cdd0" }} htmlFor="select-tag">
              Tag
            </InputLabel>
            <Select
              value={this.state.tag}
              onChange={this.handleSelectChange}
              inputProps={{
                name: "tag",
                id: "select-tag"
              }}
              MenuProps={MenuProps}
            >
              <MenuItem value="None" style={{ color: "#c3cdd0" }}>
                None
              </MenuItem>
              {tags.map(tag => (
                <MenuItem key={tag} value={tag} style={{ color: "#c3cdd0" }}>
                  {tag}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            type="number"
            label="Amount"
            className={classes.textField}
            onChange={this.handleInputChange}
            value={this.state.amount}
            InputProps={{
              className: classes.inputColor,
              startAdornment: (
                <InputAdornment variant="filled" position="start">
                  {currency}
                </InputAdornment>
              )
            }}
            InputLabelProps={{
              className: classes.inputColor
            }}
          />
          <SnackBar
            onButtonClick={this.onButtonClick}
            action="Add"
            buttonStyles={{ marginTop: "1.5em" }}
          />
        </div>
      </div>
    );
  }
}

AddExpenceForm.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(AddExpenceForm);
