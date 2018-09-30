import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';

import AddNewTagExpantionPanel from '../ExpantionPanel/AddNewTagExpantionPanel';
import SuccessSnackBar from '../Snackbar/SuccessSnackBar';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
    marginLeft: '1em',
  },
  paper: {
    maxWidth: "30em",
    padding: "1em",
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      height: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

const AddExpenceForm = ({ classes, handleSelectChange, handleInputChange, currentTag, availableTags, onButtonClickAddExpence, handleNewTagInputChange, onButtonClickAddNewTag }) => {
// this.state = currentTag: '', currentAmount: ''
// onButtonClickAddExpence(this.state...)
  return (
    <div className='center' style={{marginTop: '4em', marginBottom: '4em'}}>
    <Paper className={classes.paper} >
      <div style={{ display: 'flex', justifyContent: 'center'}}>
        <h1 style={{ fontWeight: '300'}}>Add New Expence</h1>
        <Button variant="fab" color="secondary" aria-label="Add" className={classes.button}>
          <AddIcon />
        </Button>
      </div>
      <div className={classes.root}>

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="select-tag">Tag</InputLabel>
          <Select
            value={currentTag}
            onChange={handleSelectChange}
            inputProps={{
              name: 'tag',
              id: 'select-tag',
            }}
            MenuProps={MenuProps}
          >
            <MenuItem value="None">None</MenuItem>
            {
              availableTags.map(tag => (
                <MenuItem
                key={tag}
                value={tag}
                >
                  {tag}
                </MenuItem>
              ))
            }
          </Select>
        </FormControl>

        <TextField
          id="input-amount"
          label="Amount"
          placeholder="Amount"
          className={classes.textField && classes.formControl}
          margin="normal"
          onChange={handleInputChange}
        />
          <SuccessSnackBar onButtonClickAddExpence={onButtonClickAddExpence}/>
      </div>
      <AddNewTagExpantionPanel
      onButtonClickAddNewTag={onButtonClickAddNewTag}
      classes={classes}
      />
      </Paper>
    </div>
  );
}

AddExpenceForm.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(AddExpenceForm);
