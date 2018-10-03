import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2,
  },
  currentTag: ''
});

class SuccessSnackBar extends React.Component {
  state = {
    open: false,
  };

  handleClick = () => {
    return this.props.onButtonClickAddExpence() === false ? false : this.setState({ open: true })
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    return this.setState({ open: false });
  };

  // onButtonClickAddExpence = () => {
  //   if (this.state.currentTag === '') {
  //     return false
  //   }
  //   fetch(`/add-expence`, {
  //     method: 'post',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': window.sessionStorage.getItem('token')
  //     },
  //     body: JSON.stringify({
  //       _id: this.state.user._id,
  //       tag: this.state.currentTag,
  //       amount: this.state.currentAmount
  //     })
  //   })
  //     .then(response => response.json())
  //     .then(user => {
  //       if (user && user.email) {
  //         this.clearInputFields(['input-amount']);
  //         return this.loadUser(user);
  //       }
  //     })
  //     .catch(err => console.log)
  // }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button onClick={this.handleClick} color="secondary" style={{marginTop: '1.5em'}}>Add</Button>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Expence archived</span>}
          action={[
            <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
              UNDO
            </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}

SuccessSnackBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SuccessSnackBar);
