import React from "react";
import LatestExpencesItem from "./LatestExpencesItem";

const dateOptions = {
  month: "short",
  day: "numeric"
};

class LatestExpencesList extends React.Component {
  render() {
    const { expences, currency } = this.props;
    const latestExpences = expences
      .slice(expences.length - 6, expences.length)
      .reverse();
    return (
      <div
        style={{
          backgroundColor: "#343b64",
          color: "#fff",
          height: "18rem",
          padding: "1rem"
        }}
      >
        Latest expences
        <div style={{ marginTop: "1rem" }}>
          {latestExpences.map((expence, i) => {
            const date = new Date(expence.timestamp).toLocaleString(
              "en-us",
              dateOptions
            );
            return (
              <LatestExpencesItem
                key={i + 1}
                date={date}
                tag={expence.tag}
                currency={currency}
                amount={expence.amount}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default LatestExpencesList;
