import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import IconButton from "@material-ui/core/IconButton";

import EditAmountForm from "../Form/EditAmountForm";

const styles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  item: {
    padding: "1rem",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    widht: "100%",
    backgroundImage:
      "linear-gradient(89deg, rgb(23, 105, 170) 0%, #1769aa 15%, #009688 75%)",
    color: "#fff",
    fontWeight: 300,
    borderBottom: "1px solid rgba(255, 255, 255, 0.6)"
  },
  button: {
    color: "#fff"
  }
});

const initialState = {
  expanded: null,
  amount: "",
  _id: "",
  edit: false
};

class MonthlyExpencesExpantionPanel extends React.Component {
  state = initialState;

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  onDeleteClick = _id => {
    fetch("/delete-expence", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.sessionStorage.getItem("token")
      },
      body: JSON.stringify({
        expence_id: _id,
        user_id: this.props.userId
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user && user.email) {
          return this.props.loadUser(user);
        }
      })
      .catch(console.log);
  };

  onClickOpenEdit = _id => {
    return this.setState(prevState => ({
      edit: !prevState.edit,
      _id: _id
    }));
  };

  dateOptions = {
    year: "2-digit",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  };

  // !!!
  // [Violation] 'click' handler took 181ms
  // [Violation] 'click' handler took 197ms
  // [Violation] 'click' handler took 181ms
  // Transition.js:354 [Violation] 'setTimeout' handler took 67ms
  // [Violation] 'click' handler took 244ms
  // [Violation] 'click' handler took 168ms
  // [Violation] 'requestIdleCallback' handler took 183ms
  // [Violation] 'click' handler took 150ms
  // !!!

  render() {
    const { classes, month, expences, userId, loadUser } = this.props;
    const { expanded } = this.state;

    const expence = expences[0].map((exp, i) => {
      // This needs a clean up
      const date = new Date(expences[0][i].timestamp);
      return (
        <div key={i} className={classes.item}>
          <div style={{ width: "80%" }}>
            {date.toLocaleString("en-us", this.dateOptions)} |
            <strong style={{ marginLeft: 10, marginRight: ".5rem" }}>
              {expences[0][i].tag}:
            </strong>
            {this.state._id === expences[0][i]._id && this.state.edit ? (
              <EditAmountForm
                expenceId={expences[0][i]._id}
                amount={expences[0][i].amount}
                userId={userId}
                loadUser={loadUser}
              />
            ) : (
              `${expences[0][i].amount}`
            )}
          </div>
          <div
            style={{
              width: "20%",
              textAlign: "right"
            }}
          >
            <IconButton className={classes.button} aria-label="Edit">
              <EditOutlinedIcon
                onClick={() => this.onClickOpenEdit(expences[0][i]._id)}
              />
            </IconButton>
            <IconButton className={classes.button} aria-label="Delete">
              <DeleteOutlinedIcon
                onClick={() => this.onDeleteClick(expences[0][i]._id)}
              />
            </IconButton>
          </div>
        </div>
      );
    });

    return (
      <div className={classes.root}>
        <ExpansionPanel
          expanded={expanded === "panel1"}
          onChange={this.handleChange("panel1")}
        >
          <ExpansionPanelSummary elevation="2" expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>{month}</Typography>
            <Typography className={classes.secondaryHeading}>
              Total: {expences[1].total}
            </Typography>
          </ExpansionPanelSummary>
          {expence}
        </ExpansionPanel>
      </div>
    );
  }
}

MonthlyExpencesExpantionPanel.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MonthlyExpencesExpantionPanel);
