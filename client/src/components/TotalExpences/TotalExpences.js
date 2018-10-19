import React from "react";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

import "./TotalExpences.css";

// move to different file
Date.prototype.getWeek = function() {
  var date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  // January 4 is always in week 1.
  var week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return (
    1 +
    Math.round(
      ((date.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7
    )
  );
};

// total expences sorted by today and week
const initialState = {
  today: 0,
  yesterday: 0,
  week: 0,
  lastWeek: 0,
  todayStyle: "green",
  weekStyle: "green",
  todaysDiff: 0,
  weeklyDiff: 0
};

class TotalExpences extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  // variables needed in sorting functions
  todaysDate = new Date();
  today = 0;
  yesterday = 0;
  week = 0;
  lastWeek = 0;

  componentDidMount() {
    this.calculateTodaysExpences(this.props.expences);
    this.calculateYesterdaysExpences(this.props.expences);
    this.calculateThisWeeksExpences(this.props.expences);
    this.calculateLastWeeksExpences(this.props.expences);

    this.setState({
      today: this.today,
      yesterday: this.yesterday,
      week: this.week,
      lastWeek: this.lastWeek,
      todaysDiffStyle: this.today <= this.yesterday ? "#58C457" : "#cc285d", // green and red
      weeklyDiffStyle: this.week <= this.lastWeek ? "#58C457" : "#cc285d", // green and red
      todaysDiff:
        this.today - this.yesterday < 0
          ? this.yesterday - this.today
          : this.today - this.yesterday,
      weeklyDiff:
        this.week - this.lastWeek < 0
          ? this.lastWeek - this.week
          : this.week - this.lastWeek
    });
  }

  calculateTodaysExpences = expences => {
    Object.keys(expences).map((month, i) => {
      const dateOfExpence = new Date(expences[i].timestamp);

      // check if the week number and weekday-number (0-6) is the same
      if (
        dateOfExpence.getWeek() === this.todaysDate.getWeek() &&
        dateOfExpence.getDay() === this.todaysDate.getDay()
      ) {
        return (this.today = this.today + expences[i].amount);
      }
    });
  };

  // do not think this works properly
  calculateYesterdaysExpences = expences => {
    Object.keys(expences).map((month, i) => {
      const dateOfExpence = new Date(expences[i].timestamp);

      // check if week number is the same and if date of expence is equal to the weekday-number before
      if (
        dateOfExpence.getWeek() === this.todaysDate.getWeek() &&
        dateOfExpence.getDay() === this.todaysDate.getDay() - 1
      ) {
        return (this.yesterday = this.yesterday + expences[i].amount);
      }
    });
  };

  calculateThisWeeksExpences = expences => {
    Object.keys(expences).map((month, i) => {
      const dateOfExpence = new Date(expences[i].timestamp);

      if (dateOfExpence.getWeek() === this.todaysDate.getWeek()) {
        this.week = this.week + expences[i].amount;
      }
    });
  };

  calculateLastWeeksExpences = expences => {
    Object.keys(expences).map((month, i) => {
      const dateOfExpence = new Date(expences[i].timestamp);

      if (dateOfExpence.getWeek() === this.todaysDate.getWeek() - 1) {
        this.lastWeek = this.lastWeek + expences[i].amount;
      }
    });
  };

  render() {
    return (
      <div className="total-expences-grid-item">
        Total expences
        <div className="expences">
          <div className="container">
            <div className="num-display">
              <p className="num-display-currency">{this.props.currency}</p>
              <p className="num-display-number">{this.state.today}</p>
            </div>
            <div className="num-display">
              <p className="num-display-currency">{this.props.currency}</p>
              <p className="num-display-number">{this.state.week}</p>
            </div>
          </div>
        </div>
        <div className="diff-container">
          <div className="container">
            <div className="diff-item-container">
              <p className="diff-item-text">TODAY</p>
              <div
                className="diff-item-number"
                style={{ backgroundColor: this.state.todaysDiffStyle }}
              >
                {`${this.props.currency}${this.state.todaysDiff}`}{" "}
                {this.today <= this.yesterday ? (
                  <ArrowDownwardIcon fontSize="small" />
                ) : (
                  <ArrowUpwardIcon fontSize="small" />
                )}
              </div>
            </div>
            <div className="diff-item-container">
              <p className="diff-item-text">WEEK</p>
              <div
                className="diff-item-number"
                style={{ backgroundColor: this.state.weeklyDiffStyle }}
              >
                {`${this.props.currency}${this.state.weeklyDiff}`}{" "}
                {this.week <= this.lastWeek ? (
                  <ArrowDownwardIcon fontSize="small" />
                ) : (
                  <ArrowUpwardIcon fontSize="small" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TotalExpences;
