import React from "react";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const styles = {
  gridItemHeader: {
    fontWeight: 300,
    color: "#fff"
  },
  gridItemLatestExpence: {
    color: "#fff",
    backgroundColor: "#343b64",
    borderRadius: 12
  },
  activeButton: {
    backgroundColor: "#cc285d",
    color: "#fff",
    fontSize: ".7rem"
  },
  button: {
    fontSize: ".7rem"
  }
};

const dateOptions = {
  month: "short",
  day: "numeric"
};

class DashboardHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedWeek: true,
      checkedMonth: false,
      latestExpence: {}
    };
  }

  toggleActiveButton = () => {
    this.setState(prevState => ({
      checkedWeek: !prevState.checkedWeek,
      checkedMonth: !prevState.checkedMonth
    }));
  };

  componentDidMount() {
    const token = window.localStorage.getItem("token");
    fetch(`/profile/latest-expence/${this.props.userId}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    })
      .then(response => response.json())
      .then(data => {
        const date = new Date(data.timestamp);
        const latestExpence = {
          tag: data.tag,
          amount: data.amount,
          date: date.toLocaleString("en-us", dateOptions)
        };
        this.setState({ latestExpence });
      })
      .catch(err => console.log("unable to get latest expence"));
  }

  render() {
    return (
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        spacing={8}
      >
        <Grid item xs={4} sm={4} md={4}>
          <h2 style={styles.gridItemHeader}>OVERVIEW</h2>
        </Grid>

        <Grid
          item
          xs={4}
          sm={4}
          md={4}
          className="center"
          style={styles.gridItemLatestExpence}
        >
          {`${this.state.latestExpence.tag} - ${
            this.state.latestExpence.amount
          } - ${this.state.latestExpence.date}`}
        </Grid>

        <Grid item xs={4} sm={4} md={4} className="center-row">
          <Button
            variant="text"
            label="LAST WEEK"
            color="secondary"
            style={
              this.state.checkedWeek ? styles["activeButton"] : styles["button"]
            }
            onClick={this.toggleActiveButton}
          >
            LAST WEEK
          </Button>
          <Button
            variant="text"
            label="LAST WEEK"
            color="secondary"
            style={
              this.state.checkedMonth
                ? styles["activeButton"]
                : styles["button"]
            }
            onClick={this.toggleActiveButton}
          >
            LAST MONTH
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default DashboardHeader;
