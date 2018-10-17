import React from "react";

const Background = () => {
  return (
    <div
      id="background"
      style={{
        backgroundColor: "#343b64",
        // backgroundImage:
        // "linear-gradient(89deg, rgb(23, 105, 170) 0%, #1769aa 15%, #009688 75%)",
        position: "fixed",
        top: "0",
        left: "0",
        height: "50vh",
        width: "100vw",
        zIndex: "-99"
      }}
    />
  );
};

export default Background;
