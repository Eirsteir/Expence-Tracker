import React from 'react';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class Switches extends React.Component {

  render() {
    const { handleChange, checkedA, checkedB, title1, title2 } = this.props;
    return (
      <div>
      <FormControlLabel
        control={
          <Switch
            checked={checkedA}
            onChange={handleChange('checkedA')}
            color="primary"
            value={title1}
          />
        }
        label={title1}
      />
      <FormControlLabel
        control={
          <Switch
            checked={checkedB}
            onChange={handleChange('checkedB')}
            color="secondary"
            value={title2}
          />
        }
        label={title2}
      />
      </div>
    );
  }
}

export default Switches;
