import React from "react";
import { Redirect } from "react-router-dom";

import History from "../../components/History/History";
import Profile from "../../components/Profile/Profile";
import AddExpenceForm from "../../components/Form/AddExpenceForm";
// import CardList from "../../components/CardList/CardList";
import MonthlyExpencesExpantionPanel from "../../components/ExpantionPanel/MonthlyExpencesExpantionPanel";

import "./Expences.css";

class Expences extends React.Component {
  render() {
    const { loadUser, user } = this.props;

    if (!this.props.isSignedIn) {
      return <Redirect to="/" />;
    }

    return (
      <div style={{ marginTop: "2em" }}>
        <Profile user={user} />

        <div
          style={{
            backgroundColor: "#fff",
            marginBottom: "4em",
            padding: "2em"
          }}
        >
          <History expences={user.expences} currency={user.currency} />
          <div>
            {Object.keys(user.expences).map((month, i) => {
              return (
                <MonthlyExpencesExpantionPanel
                  key={i + 1}
                  month={month}
                  expences={user.expences[month]}
                  userId={user._id}
                  userCurrency={user.currency}
                  loadUser={loadUser}
                />
              );
            })}
          </div>
          <AddExpenceForm user={user} loadUser={loadUser} />
        </div>

        {/*<CardList expences={user.expences} />*/}
      </div>
    );
  }
}

export default Expences;
