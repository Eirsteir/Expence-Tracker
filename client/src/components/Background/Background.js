import React from "react";

const Background = () => {
  return (
    <div
      id="background"
      style={{
        backgroundImage:
          "linear-gradient(89deg, #9c27b0 0%, #f50057 50%, #ff9800 95%)",
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
