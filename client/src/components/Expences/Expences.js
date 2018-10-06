import React from "react";
import History from "./History/History";
import Paper from "@material-ui/core/Paper";

import AddExpenceForm from "../Form/AddExpenceForm";
import CardList from "../CardList/CardList";
import MonthlyExpencesExpantionPanel from "../ExpantionPanel/MonthlyExpencesExpantionPanel";

import "./Expences.css";

class Expences extends React.Component {
  render() {
    const { loadUser, user } = this.props;

    // Add all expences (amounts) to a respective total (expencesSortedByMonth['month_name'][1].total)
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
