import React from "react";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

import "../TotalExpences/TotalExpences.css";

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
  week: 0,
  lastWeek: 0,
  month: 0,
  lastMonth: 0,
  weeklyDiffStyle: "green",
  monthlyDiffStyle: "green",
  dailyDiff: 0,
  weeklyDiff: 0
};

// How many expences on a daily and weekly averege?
// get number of expences of each day of week
// divide by number of days aka 7
class ExpencesFrequency extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  // variables needed in sorting functions
  todaysDate = new Date();
  week = 0;
  lastWeek = 0;
  month = 0;
  lastMonth = 0;

  componentDidMount() {
    this.calculateThisWeeksFrequency(this.props.expences);
    this.calculateLastWeeksFrequency(this.props.expences);
    this.calculateThisMonthsFrequency(this.props.expences);
    this.calculateLastMonthsFrequency(this.props.expences);

    const weeklyDiff =
      this.week - this.lastWeek < 0
        ? this.lastWeek - this.week
        : this.week - this.lastWeek;

    const monthlyDiff =
      this.month - this.lastMonth < 0
        ? this.lastMonth - this.month
        : this.month - this.lastMonth;

    this.setState({
      week: this.week,
      lastWeek: this.lastWeek,
      month: this.month,
      lastMonth: this.lastMonth,
      weeklyDiffStyle: this.week <= this.lastWeek ? "#58C457" : "#cc285d", // green and red
      monthlyDiffStyle: this.month <= this.lastMonth ? "#58C457" : "#cc285d", // green and red
      weeklyDiff: weeklyDiff.toFixed(1),
      monthlyDiff: monthlyDiff.toFixed(1)
    });
  }

  // average number of daily expences this week
  calculateThisWeeksFrequency = expences => {
    Object.keys(expences).map((month, i) => {
      const dateOfExpence = new Date(expences[i].timestamp);

      // check if the week number and weekday-number (0-6) is the same
      if (dateOfExpence.getWeek() === this.todaysDate.getWeek()) {
        return this.week++;
      }
      return true;
    });
    this.week = (this.week / 7).toFixed(1);
    return this.week;
  };

  // average number of daily expences last week
  calculateLastWeeksFrequency = expences => {
    Object.keys(expences).map((month, i) => {
      const dateOfExpence = new Date(expences[i].timestamp);

      // check if week number is the same and if date of expence is equal to the weekday-number before
      if (dateOfExpence.getWeek() === this.todaysDate.getWeek() - 1) {
        return this.lastWeek++;
      }
      return true;
    });
    this.lastWeek = (this.lastWeek / 7).toFixed(1);
    return this.lastWeek;
  };

  // average expences per week this month
  calculateThisMonthsFrequency = expences => {
    Object.keys(expences).map((month, i) => {
      const dateOfExpence = new Date(expences[i].timestamp);

      if (dateOfExpence.getMonth() === this.todaysDate.getMonth()) {
        return this.month++;
      }
      return true;
    });
    this.month = (this.month / 4).toFixed(1);
    return this.month;
  };

  // average expences per week last month
  calculateLastMonthsFrequency = expences => {
    Object.keys(expences).map((month, i) => {
      const dateOfExpence = new Date(expences[i].timestamp);

      if (dateOfExpence.getMonth() === this.todaysDate.getMonth() - 1) {
        return this.lastMonth++;
      }
      return true;
    });
    this.lastMonth = (this.lastMonth / 4).toFixed(1);
    return this.lastMonth;
  };

  render() {
    return (
      <div className="total-expences-grid-item">
        Frequency of expences
        <div className="expences">
          <div className="container">
            <div className="num-display">
              <p className="num-display-number">{this.state.week}</p>
            </div>
            <div className="num-display">
              <p className="num-display-number">{this.state.month}</p>
            </div>
          </div>
        </div>
        <div className="diff-container">
          <div className="container">
            <div className="diff-item-container">
              <p className="diff-item-text">DAILY</p>
              <div
                className="diff-item-number"
                style={{ backgroundColor: this.state.weeklyDiffStyle }}
              >
                {`${this.state.weeklyDiff}`}{" "}
                {this.week <= this.lastWeek ? (
                  <ArrowDownwardIcon fontSize="small" />
                ) : (
                  <ArrowUpwardIcon fontSize="small" />
                )}
              </div>
            </div>
            <div className="diff-item-container">
              <p className="diff-item-text">WEEKLY</p>
              <div
                className="diff-item-number"
                style={{ backgroundColor: this.state.monthlyDiffStyle }}
              >
                {`${this.state.monthlyDiff}`}{" "}
                {this.month <= this.lastMonth ? (
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

export default ExpencesFrequency;
