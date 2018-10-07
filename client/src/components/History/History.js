import React from "react";
import { Line } from "react-chartjs-2";

import Switch from "../Switch/Switch";

import "../../containers/Expences/Expences.css";

const chartOptions = {
  maintainAspectRatio: false,
  scales: {
    yAxes: [
      {
        ticks: {
          suggestedMin: 10,
          suggestedMax: 100,
          fontColor: "rgba(0,0,0,0.5)",
          fontStyle: "bold",
          beginAtZero: true,
          maxTicksLimit: 5,
          padding: 20
        },
        gridLines: {
          drawTicks: false,
          display: false
        }
      }
    ],
    xAxes: [
      {
        gridLines: {
          zeroLineColor: "transparent"
        },
        ticks: {
          padding: 20,
          fontColor: "rgba(0,0,0,0.5)"
        }
      }
    ]
  },
  animation: {
    easing: "easeOutExpo"
  },
  legend: {
    position: "bottom"
  }
};

const months = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

class ExpenceHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedA: true,
      checkedB: false
    };
  }

  handleChange = name => event => {
    if (name === "checkedA") {
      return this.setState({
        checkedA: event.target.checked,
        checkedB: !event.target.checked
      });
    } else if (name === "checkedB") {
      return this.setState({
        checkedA: !event.target.checked,
        checkedB: event.target.checked
      });
    }
  };

  chartData = canvas => {
    const now = new Date();
    const { expences } = this.props;

    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 10, 1000, 20);
    gradient.addColorStop(0, "rgba(	23, 105, 170, 0.7)");
    gradient.addColorStop(1, "rgba(	0, 150, 136, 0.7)");

    const borderGradient = ctx.createLinearGradient(0, 10, 1000, 20);
    borderGradient.addColorStop(0, "#1769aa");
    borderGradient.addColorStop(1, "#009688");

    const expencesThisMonth = expences[months[now.getMonth()]][0];
    var options = {
      weekday: "short",
      year: "numeric",
      month: "2-digit",
      day: "numeric"
    };

    const labels = this.state.checkedA
      ? months.slice(0, now.getMonth() + 1)
      : expencesThisMonth.map((month, i) => {
          const date = new Date(expencesThisMonth[i].timestamp);
          return date.toLocaleString("en-us", options);
        });

    const data = this.state.checkedA
      ? Object.keys(this.props.expences).map(
          (month, i) => this.props.expences[month][1].total
        )
      : expencesThisMonth.map((month, i) => expencesThisMonth[i].amount);

    return {
      labels: labels,
      datasets: [
        {
          label: "Amount",
          data: data,
          fill: true,
          backgroundColor: gradient,
          lineTension: 0.0000001,
          borderColor: borderGradient,
          borderWidth: 3,
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10
        }
      ]
    };
  };

  render() {
    return (
      <div>
        <div className="center" style={{ marginBottom: "4em" }}>
          <h1 style={{ fontWeight: "300" }}>History</h1>
          <Switch
            handleChange={this.handleChange}
            checkedA={this.state.checkedA}
            checkedB={this.state.checkedB}
            title1="This year"
            title2="This month"
          />
          <div
            className="center"
            style={{ position: "relative", height: "60vh", width: "80vw" }}
          >
            <Line data={this.chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    );
  }
}

export default ExpenceHistory;
