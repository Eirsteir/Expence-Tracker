import React from "react";

const Background = () => {
  return (
    <div
      style={{
        backgroundColor: "#343b64",
        backgroundImage: "linear-gradient(135deg, #dd1173, #350e47)",
        // backgroundImage:
        // "linear-gradient(89deg, rgb(23, 105, 170) 0%, #1769aa 15%, #009688 75%)",
        position: "absolute",
        top: "0",
        left: "0",
        height: "100%",
        width: "100%",
        zIndex: "-99"
      }}
    />
  );
};

export default Background;
