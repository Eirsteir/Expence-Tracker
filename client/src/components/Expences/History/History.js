import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Line } from 'react-chartjs-2';

import MonthlyExpencesExpantionPanel from '../../ExpantionPanel/MonthlyExpencesExpantionPanel';
import Switch from '../../Switch/Switch';

import '../Expences.css';

const chartOptions = {
  maintainAspectRatio: false,
  scales: {
    yAxes: [{
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
    }],
    xAxes: [{
      gridLines: {
        zeroLineColor: "transparent"
      },
      ticks: {
        padding: 20,
        fontColor: "rgba(0,0,0,0.5)",
      },

    }]
  },
  animation: {
    easing: 'easeOutExpo'
  },
  legend: {
    position: "bottom"
  },
}


class ExpenceHistory extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      checkedA: true,
      checkedB: false,
    };
  }

  handleChange = name => event => {
    if (name === 'checkedA') {
      return this.setState({
        checkedA: event.target.checked,
        checkedB: !event.target.checked,
      })
    } else if (name === 'checkedB') {
      return this.setState({
        checkedA: !event.target.checked,
        checkedB: event.target.checked,
      })
    }
  };


  chartYearlyData = canvas => {
    const now = new Date();
    // linear-gradient(89deg, #9fb8ad 0%, #1fc8db 51%, #2cb5e8 75%)
    const ctx = canvas.getContext("2d")
    const gradient = ctx.createLinearGradient(0,10,1000,20);
    gradient.addColorStop(0, 'rgba(	23, 105, 170, 0.6)');
    gradient.addColorStop(1, 'rgba(	0, 150, 136, 0.6)');

    const borderGradient = ctx.createLinearGradient(0,10,1000,20);
    borderGradient.addColorStop(0, '#1769aa');
    borderGradient.addColorStop(1, '#009688');

    return {
      labels: this.props.months.slice(0, now.getMonth() + 1),
      datasets: [
        {
          label: 'Amount',
          data: Object.keys(this.props.expencesSortedByMonth).map((month, i) => this.props.expencesSortedByMonth[month][1].total),
          fill: true,
          backgroundColor: gradient,
          lineTension:0.0000001,
          borderColor: borderGradient,
          borderWidth: 5,
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
        }
      ],
    }
  }

  chartMonthlyData = canvas => {
    const now = new Date();
    const { expencesSortedByMonth, months } = this.props;

    const ctx = canvas.getContext("2d")
    const gradient = ctx.createLinearGradient(0,10,1000,20);
    gradient.addColorStop(0, 'rgba(	23, 105, 170, 0.7)');
    gradient.addColorStop(1, 'rgba(	0, 150, 136, 0.7)');

    const borderGradient = ctx.createLinearGradient(0,10,1000,20);
    borderGradient.addColorStop(0, '#1769aa');
    borderGradient.addColorStop(1, '#009688');

    const expencesThisMonth = expencesSortedByMonth[months[now.getMonth()]][0]
    var options = { weekday: 'short', year: 'numeric', month: '2-digit', day: 'numeric' };

    const labels = expencesThisMonth.map((month, i) => {
      const date = new Date(expencesThisMonth[i].timestamp);
      return date.toLocaleString('en-us', options);
    })

    return {
      labels: labels,
      datasets: [
        {
          label: 'Amount',
          data: expencesThisMonth.map((month, i) => expencesThisMonth[i].amount),
          fill: true,
          backgroundColor: gradient,
          lineTension:0.0000001,
          borderColor: borderGradient,
          borderWidth: 5,
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
        }
      ],
    }
  }

  render() {
    const { expencesSortedByMonth } = this.props;

    return (
      <Paper style={{marginTop: '4em', marginBottom: '4em', padding: '2em'}}>
      <div className="center" style={{ marginBottom: '4em'}}>
      <h1 style={{fontWeight: '300'}}>History</h1>
      <Switch handleChange={this.handleChange}
        checkedA={this.state.checkedA}
        checkedB={this.state.checkedB}
        title1="This year"
        title2="This month"
      />
      <div className="center" style={{position: 'relative', height: '40vh', width: '80vw'}}>
      <Line
      data={this.state.checkedA ? this.chartYearlyData : this.chartMonthlyData}
      options={chartOptions}
      />
      </div>
      </div>
      <div>
      {
        Object.keys(expencesSortedByMonth).map((month, i) => {
          return <MonthlyExpencesExpantionPanel key={i +1} month={month} expences={expencesSortedByMonth[month]}/>
        })
      }
      </div>
      </Paper>
    )
  }
}

export default ExpenceHistory;
