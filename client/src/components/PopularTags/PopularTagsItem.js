import React from "react";

const PopularTagsItem = ({ tag, amount, currency }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        height: "2.5rem",
        color: "#c3cdd0",
        padding: "0 1rem"
      }}
    >
      <p>{tag}</p>
      <p>
        {currency}
        {amount}
      </p>
    </div>
  );
};

export default PopularTagsItem;
