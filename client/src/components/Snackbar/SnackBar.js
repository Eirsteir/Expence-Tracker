import React from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { useShallowEqual } from "shouldcomponentupdate-children";

class SnackBar extends React.Component {
  state = {
    open: false
  };

  handleClick = () => {
    return this.props.onButtonClick() === false
      ? false
      : this.setState({ open: true });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    return this.setState({ open: false });
  };

  render() {
    const { action, buttonStyles } = this.props;
    return (
      <div>
        <Button
          onClick={this.handleClick}
          color="secondary"
          style={buttonStyles}
        >
          {action}
        </Button>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">Expence archived</span>}
          action={[
            // <Button
            //   key="undo"
            //   color="secondary"
            //   size="small"
            //   onClick={this.handleClose}
            // >
            //   UNDO
            // </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              style={{ padding: 4 }}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    );
  }
}

SnackBar = useShallowEqual(SnackBar);

export default SnackBar;
