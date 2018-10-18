import React from "react";
import { Line } from "react-chartjs-2";

import "../../containers/Dashboard/Dashboard.css";

const chartOptions = currency => {
  return {
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          ticks: {
            suggestedMin: 10,
            suggestedMax: 100,
            fontColor: "rgba(255,255,255, 0.6)",
            fontWeight: 300,
            beginAtZero: true,
            maxTicksLimit: 5,
            padding: 20,
            // Include a dollar sign in the ticks
            callback: function(value, index, values) {
              return `${currency}${value}`;
            }
          },
          gridLines: {
            zeroLineColor: "transparent"
          },
          fontFamily: "Roboto"
        }
      ],
      xAxes: [
        {
          gridLines: {
            drawTicks: false,
            display: false
          },
          ticks: {
            padding: 20,
            fontColor: "rgba(255,255,255, 0.6)",
            fontWeight: 300
          }
        }
      ]
    },
    animation: {
      easing: "easeOutExpo"
    },
    legend: {
      display: false
    },
    tooltips: {
      callbacks: {
        label: function(tooltipItem) {
          return tooltipItem.yLabel;
        }
      }
    }
  };
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
  chartData = canvas => {
    const now = new Date();
    const { expences } = this.props;

    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, 170);
    gradient.addColorStop(0, "rgba(	204, 40, 93, 0.5)");
    gradient.addColorStop(1, "rgba(	0, 0, 0, 0.1)");

    const expencesThisMonth = expences[months[now.getMonth()]][0];
    var options = {
      month: "2-digit",
      day: "2-digit"
    };

    const labels = expencesThisMonth.map((month, i) => {
      const date = new Date(expencesThisMonth[i].timestamp);
      return date.toLocaleString("en-us", options);
    });

    const data = expencesThisMonth.map(
      (month, i) => expencesThisMonth[i].amount
    );

    return {
      labels: labels,
      datasets: [
        {
          label: "Remove this",
          data: data,
          fill: true,
          backgroundColor: gradient,
          lineTension: 0.35,
          borderColor: "rgba(204, 40, 93, 0.7)",
          borderWidth: 3,
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",

          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(204, 40, 93, 0.7)",
          pointHoverBorderColor: "rgba(204, 40, 93, 0.7)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10
        }
      ]
    };
  };

  render() {
    return (
      <div
        style={{ padding: "1rem", backgroundColor: "#343b64", color: "#fff" }}
      >
        <div style={{ paddingBottom: "1.5rem" }}>Expences</div>
        <div className="center">
          <Line
            data={this.chartData}
            options={chartOptions(this.props.currency)}
            height={244}
          />
        </div>
      </div>
    );
  }
}

export default ExpenceHistory;
