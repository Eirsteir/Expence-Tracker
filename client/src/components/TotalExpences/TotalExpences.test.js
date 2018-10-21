import { shallow } from "enzyme";
import React from "react";
import TotalExpences from "./TotalExpences.js";

const today = new Date();
const yesterday = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 1
);
const lastWeek = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 7
);

const mockExpencesPositiveDiff = [
  { timestamp: today, tag: "Food", amount: 500 },
  { timestamp: yesterday, tag: "Food", amount: 400 },
  { timestamp: lastWeek, tag: "Food", amount: 50 },
  { timestamp: lastWeek, tag: "Food", amount: 50 }
];

const mockExpencesNegativeDiff = [
  { timestamp: today, tag: "Food", amount: 400 },
  { timestamp: yesterday, tag: "Food", amount: 500 },
  { timestamp: lastWeek, tag: "Food", amount: 1000 }
];

describe("calculate total expences today/yesterday", () => {
  it("should return the sum of expences today", () => {
    const wrapper = shallow(
      <TotalExpences currency={"$"} expences={mockExpencesPositiveDiff} />
    );
    expect(wrapper.state("today")).toBe(500);
  });

  it("should return the sum of expences yesterday", () => {
    const wrapper = shallow(
      <TotalExpences currency={"$"} expences={mockExpencesPositiveDiff} />
    );
    expect(wrapper.state("yesterday")).toBe(400);
  });

  it("should return the difference in expences today and yesterday when todays are greater", () => {
    const wrapper = shallow(
      <TotalExpences currency={"$"} expences={mockExpencesPositiveDiff} />
    );
    expect(wrapper.state("todaysDiff")).toBe(100);
  });

  it("should return the difference in expences today and yesterday when yesterdays expences are greater", () => {
    const wrapper = shallow(
      <TotalExpences currency={"$"} expences={mockExpencesNegativeDiff} />
    );
    expect(wrapper.state("todaysDiff")).toBe(100);
  });

  it("should return the color green when expences todays expences are greater than yesterdays expences", () => {
    const wrapper = shallow(
      <TotalExpences currency={"$"} expences={mockExpencesNegativeDiff} />
    );
    expect(wrapper.state("todaysDiffStyle")).toBe("#58C457");
  });

  it("should return the color red when expences todays expences are less than than yesterdays", () => {
    const wrapper = shallow(
      <TotalExpences currency={"$"} expences={mockExpencesPositiveDiff} />
    );
    expect(wrapper.state("todaysDiffStyle")).toBe("#cc285d");
  });
});

describe("calculate total expences this week/last week", () => {
  it("should return the sum of expences this week", () => {
    const wrapper = shallow(
      <TotalExpences currency={"$"} expences={mockExpencesPositiveDiff} />
    );
    expect(wrapper.state("week")).toBe(900);
  });

  it("should return the sum of expences last week", () => {
    const wrapper = shallow(
      <TotalExpences currency={"$"} expences={mockExpencesPositiveDiff} />
    );
    expect(wrapper.state("lastWeek")).toBe(100);
  });

  it("should return the difference in expences this week and last week when this weeks expences are greater", () => {
    const wrapper = shallow(
      <TotalExpences currency={"$"} expences={mockExpencesPositiveDiff} />
    );
    expect(wrapper.state("weeklyDiff")).toBe(800);
  });

  it("should return the difference in expences this week and last week when last weeks expences are greater", () => {
    const wrapper = shallow(
      <TotalExpences currency={"$"} expences={mockExpencesNegativeDiff} />
    );
    expect(wrapper.state("weeklyDiff")).toBe(100);
  });

  it("should return the color green when expences this week are greater than expences last week", () => {
    const wrapper = shallow(
      <TotalExpences currency={"$"} expences={mockExpencesNegativeDiff} />
    );
    expect(wrapper.state("weeklyDiffStyle")).toBe("#58C457");
  });

  it("should return the color red when expences this week are less than than expences last week", () => {
    const wrapper = shallow(
      <TotalExpences currency={"$"} expences={mockExpencesPositiveDiff} />
    );
    expect(wrapper.state("weeklyDiffStyle")).toBe("#cc285d");
  });
});
