import { shallow } from "enzyme";
import React from "react";
import History from "./History.js";

it("expect to render CardList component", () => {
  const mockExpences = [
    { timestamp: new Date(0), tag: "Household", amount: 200 },
    { timestamp: new Date(0), tag: "Food", amount: 300 },
    { timestamp: new Date(0), tag: "Food", amount: 500 }
  ];
  expect(shallow(<History expences={mockExpences} />)).toMatchSnapshot();
});
