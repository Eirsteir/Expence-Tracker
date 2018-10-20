import React from "react";

import ArrowRightIcon from "@material-ui/icons/ArrowRight";

const PopularTagsItem = ({ tag, amount, currency }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        height: "2.5rem",
        color: "#c3cdd0"
      }}
    >
      <p>{tag}</p>
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

export default PopularTagsItem;
