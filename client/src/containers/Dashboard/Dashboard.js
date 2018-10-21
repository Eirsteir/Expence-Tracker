// DASHBOARD

import React from "react";
import { Redirect } from "react-router-dom";

import Grid from "@material-ui/core/Grid";

import Chart from "../../components/Chart/Chart";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";
import PopularTagsList from "../../components/PopularTags/PopularTagsList";
import TotalExpences from "../../components/TotalExpences/TotalExpences";
import ExpencesFrequency from "../../components/ExpencesFrequency/ExpencesFrequency";
import LatestExpencesList from "../../components/LatestExpences/LatestExpencesList";
import AddExpenceForm from "../../components/Form/AddExpenceForm";
import AddTagForm from "../../components/Form/AddTagForm";

import "./Dashboard.css";

const initialState = {
  week: true,
  month: false
};

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  toggleData = () => {
    this.setState(prevState => ({
      week: !prevState.week,
      month: !prevState.month
    }));
  };

  render() {
    const { loadUser, user } = this.props;
    const { expencesThisMonth, expencesLastMonth } = user.expences;

    if (!this.props.isSignedIn) {
      return <Redirect to="/" />;
    }

    return (
      <div className="dashboard-container">
        <DashboardHeader
          userId={user._id}
          currency={user.currency}
          toggleData={this.toggleData}
        />

        <Grid
          container
          justify="space-between"
          direction="row"
          wrap="wrap"
          spacing={32}
        >
          <Grid item xs={12} sm={6} md={4}>
            <PopularTagsList
              expences={
                this.state.week ? expencesThisMonth[0] : expencesLastMonth[0]
              }
              tags={user.tags}
              currency={user.currency}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Grid container direction="column" justify="center" spacing={32}>
              <Grid item>
                <TotalExpences
                  currency={user.currency}
                  expences={expencesThisMonth[0]}
                />
              </Grid>

              <Grid item>
                <ExpencesFrequency expences={expencesThisMonth[0]} />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <LatestExpencesList
              currency={user.currency}
              expences={
                this.state.week ? expencesThisMonth[0] : expencesLastMonth[0]
              }
            />
          </Grid>

          <Grid item xs={12} sm={12} md={8}>
            <Chart expences={expencesThisMonth[0]} currency={user.currency} />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <Grid container justify="center" spacing={16} wrap="wrap">
              <Grid item xs={12} sm={6} md={12}>
                <AddExpenceForm
                  _id={user._id}
                  tags={user.tags}
                  currency={user.currency}
                  loadUser={loadUser}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={12}>
                <AddTagForm _id={user._id} loadUser={loadUser} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;

// {Object.keys(user.expences).map((month, i) => {
// return (
// <MonthlyExpencesExpantionPanel
// key={i + 1}
// month={month}
// expences={user.expences[month]}
// userId={user._id}
// userCurrency={user.currency}
// loadUser={loadUser}
// />
// );
// })}
