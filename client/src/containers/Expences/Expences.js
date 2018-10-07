import React from "react";
import Paper from "@material-ui/core/Paper";

import History from "../../components/History/History";
import AddExpenceForm from "../../components/Form/AddExpenceForm";
// import CardList from "../../components/CardList/CardList";
import MonthlyExpencesExpantionPanel from "../../components/ExpantionPanel/MonthlyExpencesExpantionPanel";

import "./Expences.css";

class Expences extends React.Component {
  render() {
    const { loadUser, user } = this.props;

    return (
      <div style={{ marginTop: "2em" }}>
        <Paper
          style={{ marginTop: "4em", marginBottom: "4em", padding: "2em" }}
        >
          <History expences={user.expences} />
          <div>
            {Object.keys(user.expences).map((month, i) => {
              return (
                <MonthlyExpencesExpantionPanel
                  key={i + 1}
                  month={month}
                  expences={user.expences[month]}
                  userId={user._id}
                  loadUser={loadUser}
                />
              );
            })}
          </div>
          <AddExpenceForm
            expences={user.expences}
            loadUser={loadUser}
            user={user}
          />
        </Paper>

        {/*<CardList expences={user.expences} />*/}
      </div>
    );
  }
}

export default Expences;
