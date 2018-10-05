import React from "react";
import AddExpenceForm from "./AddExpenceForm";
import CardList from "../CardList/CardList";
import History from "./History/History";

import "./Expences.css";

class Expences extends React.Component {
  render() {
    const { loadUser, user } = this.props;

    // Add all expences (amounts) to a respective total (expencesSortedByMonth['month_name'][1].total)
    return (
      <div style={{ marginTop: "2em" }}>
        <History
          expences={user.expences}
          loadUser={loadUser}
          userId={user._id}
        />
        <CardList expences={user.expences} />
        <AddExpenceForm
          expences={user.expences}
          loadUser={loadUser}
          user={user}
        />
      </div>
    );
  }
}

export default Expences;
