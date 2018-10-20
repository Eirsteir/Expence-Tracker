import { shallow } from "enzyme";
import React from "react";
import ExpencesFrequency from "./ExpencesFrequency.js";

const today = new Date();
const lastWeek = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 7
);
const lastMonth = new Date(
  today.getFullYear(),
  today.getMonth() - 1,
  today.getDate()
);

const mockExpences = [
  // 7 expences today/this week/month
  { timestamp: today, tag: "Food", amount: 500 },
  { timestamp: today, tag: "Food", amount: 500 },
  { timestamp: today, tag: "Food", amount: 500 },
  { timestamp: today, tag: "Food", amount: 500 },
  { timestamp: today, tag: "Food", amount: 500 },
  { timestamp: today, tag: "Food", amount: 500 },
  { timestamp: today, tag: "Food", amount: 500 },
  // 7 expences last week
  { timestamp: lastWeek, tag: "Household", amount: 200 },
  { timestamp: lastWeek, tag: "Food", amount: 300 },
  { timestamp: lastWeek, tag: "Household", amount: 200 },
  { timestamp: lastWeek, tag: "Food", amount: 300 },
  { timestamp: lastWeek, tag: "Household", amount: 200 },
  { timestamp: lastWeek, tag: "Food", amount: 300 },
  { timestamp: lastWeek, tag: "Food", amount: 300 },
  // 7 expences last month
  { timestamp: lastMonth, tag: "Food", amount: 500 },
  { timestamp: lastMonth, tag: "Food", amount: 500 },
  { timestamp: lastMonth, tag: "Food", amount: 500 },
  { timestamp: lastMonth, tag: "Food", amount: 500 },
  { timestamp: lastMonth, tag: "Food", amount: 500 },
  { timestamp: lastMonth, tag: "Food", amount: 500 },
  { timestamp: lastMonth, tag: "Food", amount: 500 }
];

describe("calculate expence frequency", () => {
  it("expect to get this weeks average number of expences", () => {
    const wrapper = shallow(<ExpencesFrequency expences={mockExpences} />);
    expect(wrapper.state("week")).toBe("1.00"); // 7 / 7
  });

  it("expect to get last weeks average number of expences", () => {
    const wrapper = shallow(<ExpencesFrequency expences={mockExpences} />);
    expect(wrapper.state("lastWeek")).toBe("1.00"); // 7 / 7
  });

  it("expect to get this months average number of expences", () => {
    const wrapper = shallow(<ExpencesFrequency expences={mockExpences} />);
    expect(wrapper.state("month")).toBe("3.50"); // 14 / 4 : takes today (7) and last week (7) into consideration
  });

  it("expect to get last months average number of expences", () => {
    const wrapper = shallow(<ExpencesFrequency expences={mockExpences} />);
    expect(wrapper.state("lastMonth")).toBe("1.75"); // 7 / 4
  });
});
