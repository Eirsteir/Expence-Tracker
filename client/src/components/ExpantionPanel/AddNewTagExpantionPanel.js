import React from 'react';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';

class AddNewTagModal extends React.Component {
  state = {
    expanded: false,
    addUserTag: '',
  };

  handleChange = event => {
    this.setState({ addUserTag: event.target.value })
  }

  handleExpandChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render() {
    const { classes, onButtonClickAddNewTag } = this.props;
    const { expanded } = this.state;

    return (
          <div style={{ marginTop: '1em' }}>
            <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleExpandChange('panel1')}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <FormHelperText
                style={{cursor: 'pointer', color: '#009688'}}
                onChange={this.handleExpandChange('panel1')}
              >
                Add New Tag
              </FormHelperText>
              </ExpansionPanelSummary>
              <div style={{display: 'flex', justifyContent:'center', padding: '0 0 1em 0', marginTop: '0'}}>
              <TextField
              id="input-new-tag"
              label="Tag"
              placeholder="Tag"
              className={classes.textField && classes.formControl}
              margin="normal"
              onChange={this.handleChange}
              />
              <Button
              variant="text"
              size="small"
              color="secondary"
              className={classes.button}
              style={{ fontSize: '1rem', marginTop: '1.5em'}}
              onClick={() => onButtonClickAddNewTag(this.state.addUserTag)}
              >
              Add
              </Button>
              </div>

            </ExpansionPanel>
          </div>
    );
  }
}

export default AddNewTagModal;
