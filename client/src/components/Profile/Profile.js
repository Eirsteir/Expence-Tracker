import React from "react";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

import "./Profile.css";

const initialState = {
  total: 0,
  numberOfExpences: 0
};

class Profile extends React.Component {
  state = initialState;

  total = 0;
  sum = 0;

  componentDidMount() {
    return this.setState({
      total: this.total,
      numberOfExpences: this.sum
    });
  }

  scrollToAddExpenceForm = () => {
    const el = document.getElementById("add-new-form");
    el.scrollIntoView({ behavior: "smooth" });
    // window.height
  };

  render() {
    const { user } = this.props;
    const { expences, name, currency } = user;

    // get each month's total and add to variable total
    Object.keys(expences).map((month, i) => {
      return (this.total = this.total + Number(expences[month][1].total));
    });

    // calculate number of expences and add to variable sum
    Object.keys(expences).map((month, i) => {
      if (expences[month][0].length === 0) {
        return true;
      }
      return (this.sum = this.sum + Number(expences[month][0].length));
    });

    return (
      <div>
        <div className="name-container">{name}</div>
        <div
          style={{
            height: 0,
            display: "flex",
            justifyContent: "center",
            position: "relative",
            bottom: "1.75em",
            color: "#fff"
          }}
        >
          <Button
            variant="fab"
            aria-label="Add"
            onClick={this.scrollToAddExpenceForm}
            style={{ backgroundColor: "#e91e63", color: "#fff" }}
          >
            <AddIcon />
          </Button>
        </div>

        <div className="technical-container">
          <div className="number-of-expences">
            <div>
              <strong>{this.state.numberOfExpences}</strong>
            </div>
            <div>Expences</div>
          </div>
          <div className="sum-expences">
            <div>
              <strong>{this.state.total}</strong>
            </div>
            <p className="currency">{currency}</p>
            <div>Total</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
