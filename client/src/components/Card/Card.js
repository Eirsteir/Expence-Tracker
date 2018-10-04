import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Doughnut } from "react-chartjs-2";

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: []
    };
  }

  // move all processing to Cardlist
  render() {
    const { classes, processedExpences, timespan } = this.props;
    const { tags } = this.state;

    let data = {
      labels: "",
      datasets: [
        {
          data: ""
        }
      ]
    };

    if (processedExpences.length !== 0) {
      console.time("map");
      // Filter tags so we have categories to display in the cards
      processedExpences.map((expence, i) => {
        const tag = processedExpences[i].tag;
        // add the tag and set amount to 0
        return (tags[tag] = 0);
      });

      // Add the amount to the corresponding tag
      processedExpences.map((expence, i) => {
        const tag = processedExpences[i].tag;
        const amount = processedExpences[i].amount;
        return (tags[tag] = Number(tags[tag]) + Number(amount));
      });

      // Add more colors from chartjs
      data = {
        labels: Object.keys(tags).map((tag, i) => tag),
        datasets: [
          {
            data: Object.keys(tags).map((tag, i) => this.state.tags[tag]),
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#FF6384",
              "#36A2EB",
              "#FFCE56"
            ],
            hoverBackgroundColor: [
              "#009688",
              "#009688",
              "#009688",
              "#009688",
              "#009688",
              "#009688",
              "#009688"
            ]
          }
        ]
      };

      console.timeEnd("map");
    }

    return (
      <Paper className="card--content">
        <h1
          style={{
            fontWeight: "300",
            padding: ".5em",
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#1769aa",
            color: "#fff",
            marginTop: "0"
          }}
        >
          {timespan === "today"
            ? "Today"
            : timespan === "thisWeek"
              ? "This Week"
              : timespan === "thisMonth"
                ? "This Month"
                : "Total"}
        </h1>

        {processedExpences.length === 0 ? (
          <Typography
            variant="body1"
            component="p"
            className={classes.emptyList}
          >
            Add a new expence
          </Typography>
        ) : (
          Object.keys(tags).map((tag, i) => {
            return (
              <Typography
                variant="body1"
                component="p"
                key={i}
                className={classes.control}
              >
                {` ${tag}: ${tags[tag]}`}
              </Typography>
            );
          })
        )}
        <Doughnut data={data} />
      </Paper>
    );
  }
}

export default Card;
