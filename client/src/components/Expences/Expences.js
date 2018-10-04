import React from "react";
import AddExpenceForm from "./AddExpenceForm";
import CardList from "../CardList/CardList";
import History from "./History/History";

import "./Expences.css";

class Expences extends React.Component {
  state = {
    expences: []
  };

  componentDidMount() {
    const { expences } = this.props.user;
    this.setState({ expences });
  }

  render() {
    const { loadUser, user } = this.props;
    const { expences } = this.state;

    // Add all expences (amounts) to a respective total (expencesSortedByMonth['month_name'][1].total)
    return (
      <div style={{ marginTop: "2em" }}>
        <History expences={expences} loadUser={loadUser} userId={user._id} />
        <CardList expences={expences} />
        <AddExpenceForm expences={expences} loadUser={loadUser} user={user} />
      </div>
    );
  }
}

export default Expences;
