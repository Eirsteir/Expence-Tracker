// DASHBOARD

import React from "react";
import { Redirect } from "react-router-dom";

import Grid from "@material-ui/core/Grid";

import History from "../../components/History/History";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";
import PopularTags from "../../components/PopularTags/PopularTags";
import TotalExpences from "../../components/TotalExpences/TotalExpences";
import ExpencesFrequency from "../../components/ExpencesFrequency/ExpencesFrequency";
import LatestExpences from "../../components/LatestExpences/LatestExpences";
import AddExpenceForm from "../../components/Form/AddExpenceForm";
import AddTagForm from "../../components/Form/AddTagForm";
// import Profile from "../../components/Profile/Profile";

import "./Dashboard.css";

const initialState = {
  week: true,
  month: false
};

class Expences extends React.Component {
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
        {/*<Profile user={user} />*/}
        {/*<CardList expences={user.expences} />*/}

        <Grid
          container
          justify="space-between"
          wrap="wrap"
          spacing={32}
          id="dashboard-grid"
        >
          <Grid item xs={12} sm={12} md={4}>
            <PopularTags />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <Grid container direction="column" justify="center" spacing={32}>
              <Grid item>
                <TotalExpences
                  currency={user.currency}
                  expences={user.expences.expencesThisMonth[0]}
                />
              </Grid>
              <Grid item>
                <ExpencesFrequency />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <LatestExpences />
          </Grid>

          <Grid item xs={12} sm={12} md={8}>
            <History
              expences={user.expences.expencesThisMonth[0]}
              currency={user.currency}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <Grid container direction="column" justify="center" spacing={16}>
              <Grid item>
                <AddExpenceForm user={user} loadUser={loadUser} />
              </Grid>

              <Grid item>
                <AddTagForm user={user} loadUser={loadUser} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <div
          style={{
            marginBottom: "4em",
            padding: "2em"
          }}
        />
      </div>
    );
  }
}

export default Expences;

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
