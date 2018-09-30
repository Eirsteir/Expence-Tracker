import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Card from '../Card/Card';
import '../Expences/Expences.css';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    width: "17em",
    minHeight: '55vh'
  },
  control: {
    padding: '.5em',
  },
  emptyList: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '2em'
  }
});


// Featured some very akward calculations of date
class ExpencesCardList extends React.Component {

  // make this state?
  constructor(props) {
    super(props);
    this.state = {
      timespan: {
        allTime: [],
        thisMonth: [],
        thisWeek: [],
        today: []
      }
    }
  }

  calculateTimeAndPushToArray = expence => {
    // https://www.compose.com/articles/understanding-dates-in-compose-mongodb/
      const now = new Date();

      const ONE_WEEK = 604800000;
      const aWeekAgo =  now - ONE_WEEK;

      let day = expence.timestamp.slice(8, 10); // get day from timestamp string and convert to integer
      day = Number(day);

      let month = expence.timestamp.slice(5, 7); // isolate month
      month = Number(month) -1; // january is 0 in .getMonth()

      let year = expence.timestamp.slice(0, 4); // get year from timestamp string and convert to integer
      year = Number(year);

      const timestamp = expence.timestamp;

      if (day === now.getDate() && month === now.getMonth() && year === now.getFullYear()) {
        this.state.timespan.today.push(expence);
      }
      if (timestamp > aWeekAgo) {
        // Fix this to display only current week, not last 7 days
        console.log('a week ago');
        this.state.timespan.thisWeek.push(expence);
      }
      if (month === now.getMonth() && year === now.getFullYear()) {
        this.state.timespan.thisMonth.push(expence);
      }

      // Popoulate thisWeek to preview the whole
      this.state.timespan.thisWeek.push(expence);

      // Push to all time total expences
      return this.state.timespan.allTime.push(expence);
    }


  render() {
    const { classes, expences } = this.props;

    expences.map((expence, i) => {
      const currentExpence = expences[i];
      return this.calculateTimeAndPushToArray(currentExpence);
    });

    return (
      <section id="card" >
      {

        Object.keys(this.state.timespan).map((span, i) => {
          return (
            <Card
            key={i}
            processedExpences={this.state.timespan[span]}
            timespan={span}
            classes={classes}
            />
          );
        })

      }
      </section>

    );
  }
}

ExpencesCardList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ExpencesCardList);

// <Grid container spacing={24} style={{padding: 24, display: 'flex', justifyContent: 'center'}}>
// {
//
//   Object.keys(this.state.timespan).map((span, i) => {
//     return (
//       <Grid item key={i} className="card">
//       <Card
//       className="card--content"
//       processedExpences={this.state.timespan[span]}
//       timespan={span}
//       classes={classes}
//       />
//       </Grid>
//     );
//   })
//
// }
// </Grid>
