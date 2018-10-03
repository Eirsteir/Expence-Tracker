import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    // display: 'flex',
    // flexWrap: 'wrap',
    display: 'inline'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    // marginRight: theme.spacing.unit,

  },
  dense: {
    // marginTop: 16,
  }
});
class EditAmountForm extends React.Component {
  state = {
    amount: this.props.amount
  }

  handleChange = event => {
    const amount = event.target.value;
    return this.setState({ amount });
  }

  onKeyDown = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.handleSignin();
    }
  }

  onSubmit = event => {
    event.preventDefault();
    event.stopPropagation();
    this.handleSubmit();
  }

  handleSubmit = () => {
    // fetch('/edit-expence', {
    //   method: 'post',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': window.sessionStorage.getItem('token')
    //   },
    //   body: JSON.stringify({
    //     _id: _id,
    //     amount: this.state.amount
    //   })
    // })
    console.log('edit successful');
  }


  render() {
    const { classes, amount } = this.props;
      return (
        <form className={classes.container} noValidate autoComplete="off" onKeyDown={this.onkeyDown} onSubmit={this.onSubmit}>
        <TextField
          id="outlined-dense"
          label={this.state.amount.toString()}
          className={classNames(classes.textField, classes.dense)}
          margin="dense"
          variant="outlined"
          type="number"
          autoFocus={true}
          value={this.state.amount}
          onChange={this.handleChange}
        />
        </form>
      );
  }
}

EditAmountForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditAmountForm);
