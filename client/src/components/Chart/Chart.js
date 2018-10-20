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
              return `${currency}${value.toLocaleString()}`;
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
    },
    responsive: true,
    cubicInterpolationMode: "monotone"
  };
};

const options = {
  month: "2-digit",
  day: "2-digit"
};

class ExpenceHistory extends React.Component {
  chartData = canvas => {
    const { expences } = this.props;

    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, 170);
    gradient.addColorStop(0, "rgba(	204, 40, 93, 0.5)");
    gradient.addColorStop(1, "rgba(	0, 0, 0, 0.1)");

    const labels = expences.map((exp, i) => {
      const date = new Date(expences[i].timestamp);
      return date.toLocaleString("en-us", options);
    });

    const data = expences.map((month, i) => expences[i].amount);

    return {
      labels: labels,
      datasets: [
        {
          label: "",
          data: data,
          fill: true,
          backgroundColor: gradient,
          borderColor: "rgba(204, 40, 93, 0.7)",
          borderWidth: 3,
          borderCapStyle: "round",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "round",
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
