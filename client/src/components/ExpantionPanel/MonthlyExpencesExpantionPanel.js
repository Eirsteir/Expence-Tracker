import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";

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
    padding: "1em",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    widht: "100%",
    // borderBottom: '5px solid transparent',
    // -moz-border-image: -moz-linear-gradient(top, #3acfd5 0%, #3a4ed5 100%);
    // -webkit-border-image: -webkit-linear-gradient(top, #3acfd5 0%, #3a4ed5 100%);
    // borderImage: 'linear-gradient(89deg, rgb(23, 105, 170) 0%, #1769aa 15%, #009688 75%)',
    // borderImageSlice: 1
    backgroundImage:
      "linear-gradient(89deg, rgb(23, 105, 170) 0%, #1769aa 15%, #009688 75%)",
    color: "#fff",
    fontWeight: 300,
    borderBottom: "1px solid rgba(255, 255, 255, 0.6)"
  },
  iconVisible: {
    position: "absolute",
    right: "0",
    cursor: "pointer",
    visibility: "visible"
  },
  iconHidden: {
    visibility: "hidden"
  }
});

class MonthlyExpencesExpantionPanel extends React.Component {
  state = {
    expanded: null,
    amount: "",
    _id: ""
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  onDeleteClick = () => {
    console.log("delete");
  };

  onEditClick = _id => {
    console.log("edit");
    return this.setState({ _id });
  };

  // Add expence
  onButtonClick = () => {
    if (this.state.amount === "") {
      return false;
    }
    fetch(`/edit-expence`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.sessionStorage.getItem("token")
      },
      body: JSON.stringify({
        _id: this.props.user._id,
        tag: this.state.currentTag,
        amount: this.state.currentAmount
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user && user.email) {
          this.setState({
            currentAmount: "",
            currentTag: "",
            availableTags: user.tags
          });
          console.log(user);
          return this.props.loadUser(user);
        }
      })
      .catch(err => console.log);
  };

  render() {
    const { classes, month, expences, userId, loadUser } = this.props;
    const { expanded } = this.state;

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
          {expences[0].map((exp, i) => {
            // This needs a clean up
            const date = new Date(expences[0][i].timestamp);
            return (
              <div key={i} className={classes.item}>
                {date.toLocaleString()} |{" "}
                <strong>{expences[0][i].tag}: </strong>{" "}
                {this.state._id === expences[0][i]._id ? (
                  <EditAmountForm
                    expenceId={expences[0][i]._id}
                    amount={expences[0][i].amount}
                    userId={userId}
                    loadUser={loadUser}
                  />
                ) : (
                  `${expences[0][i].amount}`
                )}
                <DeleteOutlinedIcon
                  onClick={this.onDeleteClick}
                  className={
                    this.state.expanded
                      ? classes.iconVisible
                      : classes.iconHidden
                  }
                />
                <EditOutlinedIcon
                  onClick={() => this.onEditClick(expences[0][i]._id)}
                  className={
                    this.state.expanded
                      ? classes.iconVisible
                      : classes.iconHidden
                  }
                  style={{ right: "3%" }}
                />
              </div>
            );
          })}
        </ExpansionPanel>
      </div>
    );
  }
}

MonthlyExpencesExpantionPanel.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MonthlyExpencesExpantionPanel);
