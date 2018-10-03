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
    tag: '',
  };

  handleChange = event => {
    this.setState({ tag: event.target.value })
  }

  handleExpandChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  // add tag
  onButtonClick = () => {
    const { tag } = this.state;
    if (tag.length === 0) {
      return false;
    }
    fetch(`/add-custom-tag`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': window.sessionStorage.getItem('token')
      },
      body: JSON.stringify({
        _id: this.props.user._id,
        tag: tag,
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user) {
          this.setState({ tag: '' })
          return this.props.loadUser(user);
        }
      })
      .catch(err => console.log)
  }

  render() {
    const { classes } = this.props;
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
              value={this.state.tag}
              />
              <Button
              variant="text"
              size="small"
              color="secondary"
              className={classes.button}
              style={{ fontSize: '1rem', marginTop: '1.5em'}}
              onClick={this.onButtonClick}
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
