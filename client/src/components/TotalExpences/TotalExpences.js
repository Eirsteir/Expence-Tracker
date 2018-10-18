import React from "react";

// move to different file?
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
  week: 0
};

class TotalExpences extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  today = 0;
  week = 0;

  componentDidMount() {
    this.calculateTotalExpences(this.props.expences);
    this.setState({
      today: this.today,
      week: this.week
    });
  }

  calculateTotalExpences = expences => {
    const todayDate = new Date();

    Object.keys(expences).map((month, i) => {
      const dateOfExpence = new Date(expences[i].timestamp);

      console.log(expences[i]);
      if (dateOfExpence.getWeek() === todayDate.getWeek()) {
        if (dateOfExpence.getDay() === todayDate.getDay()) {
          return (this.today = this.today + expences[i].amount);
        } else {
          this.week = this.week + expences[i].amount;
        }
      }
    });
  };

  render() {
    return (
      <div
        style={{
          backgroundColor: "#343b64",
          color: "#fff",
          height: "7rem",
          padding: "1rem"
        }}
      >
        Total expences
        <div>{this.state.today}</div>
        <div>{this.state.week}</div>
      </div>
    );
  }
}

export default TotalExpences;
