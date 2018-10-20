import React from "react";

const styles = {
  gridItemContainer: {
    backgroundColor: "#343b64",
    padding: "1rem",
    border: "none",
    borderRadius: 5
  },
  infoItems: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#c3cdd0"
  }
};

const dateOptions = {
  day: "numeric",
  month: "short",
  year: "numeric"
};

const Info = ({ name, email, joined, currency }) => {
  joined = new Date(joined).toLocaleString("en-us", dateOptions);

  return (
    <div style={styles.gridItemContainer}>
      Info
      <div style={{ width: "90%", padding: "1rem" }}>
        <div style={styles.infoItems}>
          <p>Name</p> {name}
        </div>
        <div style={styles.infoItems}>
          <p>Email</p> {email}
        </div>
        <div style={styles.infoItems}>
          <p>Date joined</p> {joined}
        </div>
        <div style={styles.infoItems}>
          <p>Currency</p> {currency}
        </div>
      </div>
    </div>
  );
};

export default Info;
