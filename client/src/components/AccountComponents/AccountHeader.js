import React from "react";
import { withRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const styles = {
  gridItemHeader: {
    fontWeight: 300,
    color: "#fff"
  },
  gridItemLatestExpence: {
    color: "#c3cdd0",
    backgroundColor: "#343b64",
    borderRadius: 12
  },
  button: {
    backgroundColor: "#cc285d",
    color: "#fff",
    fontSize: ".8rem"
  }
};

const dateOptions = {
  month: "short",
  day: "numeric"
};

class AccountHeader extends React.Component {
  handleClick = () => {
    return this.props.history.push("/home");
  };

  render() {
    return (
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        spacing={32}
      >
        <Grid item xs={12} sm={6} md={6} className="xs-center">
          <h2 style={styles.gridItemHeader}>ACCOUNT</h2>
        </Grid>

        <Grid item xs={12} sm={6} md={6} className="justify-end">
          <Button
            variant="text"
            label="HOME"
            color="secondary"
            style={styles.button}
            onClick={this.handleClick}
          >
            Home
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default withRouter(AccountHeader);
