import React from "react";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

const LatestExpencesItem = ({ date, tag, currency, amount }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        height: "2.5rem",
        color: "#c3cdd0"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <p style={{ opacity: 0.6, marginRight: ".5rem" }}>{date}</p>
        {tag}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "110%"
        }}
      >
        {currency}
        {amount}
        <ArrowRightIcon style={{ marginLeft: "1rem" }} />
      </div>
    </div>
  );
};

export default LatestExpencesItem;
