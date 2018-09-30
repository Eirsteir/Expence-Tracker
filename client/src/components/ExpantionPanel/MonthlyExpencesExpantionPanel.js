import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  item: {
    padding: '1em',
    borderBottom: '5px solid transparent',
  // -moz-border-image: -moz-linear-gradient(top, #3acfd5 0%, #3a4ed5 100%);
  // -webkit-border-image: -webkit-linear-gradient(top, #3acfd5 0%, #3a4ed5 100%);
    borderImage: 'linear-gradient(89deg, rgb(23, 105, 170) 0%, #1769aa 15%, #009688 75%)',
    borderImageSlice: 1
  }
});

class MonthlyExpencesExpantionPanel extends React.Component {
  state = {
    expanded: null,
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render() {
    const { classes, month, expences } = this.props;
    const { expanded } = this.state;

    return (
      <div className={classes.root}>
          <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>{month}</Typography>
              <Typography className={classes.secondaryHeading}>Total: {expences[1].total}</Typography>
            </ExpansionPanelSummary>
            {
              expences[0].map((exp, i) => {
                const date = new Date(expences[0][i].timestamp);
                return (
                  <Typography key={i} className={classes.item} style={{widht: '100%', display: 'block'}}>
                    {date.toLocaleString()} | <strong>{expences[0][i].tag}: </strong> {expences[0][i].amount}
                  </Typography>
                )
              })
            }
          </ExpansionPanel>
      </div>
    );
  }
}

MonthlyExpencesExpantionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MonthlyExpencesExpantionPanel);
