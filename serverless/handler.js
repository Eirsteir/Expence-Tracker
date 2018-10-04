"use strict";

module.exports.sortData = async (event, context) => {
  const body = JSON.parse(event.body);
  const expences = body.expences;

  const expencesSortedByMonth = {
    January: [[], { total: 0 }],
    Febuary: [[], { total: 0 }],
    March: [[], { total: 0 }],
    April: [[], { total: 0 }],
    May: [[], { total: 0 }],
    June: [[], { total: 0 }],
    July: [[], { total: 0 }],
    August: [[], { total: 0 }],
    September: [[], { total: 0 }],
    October: [[], { total: 0 }],
    November: [[], { total: 0 }],
    December: [[], { total: 0 }]
  };

  const months = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  expences.map((exp, i) => {
    const date = new Date(expences[i].timestamp);
    const expMonth = months[date.getMonth()];
    return expencesSortedByMonth[expMonth][0].push(expences[i]);
  });

  // Add all expences (amounts) to a respective total (expencesSortedByMonth['month_name'][1].total)
  Object.keys(expencesSortedByMonth).map((month, i) => {
    // If no expences - skip month
    if (expencesSortedByMonth[month][0].length === 0) {
      return false;
    } else {
      return expencesSortedByMonth[month][0].forEach((exp, i) => {
        return (expencesSortedByMonth[month][1].total =
          Number(expencesSortedByMonth[month][1].total) + Number(exp.amount));
      });
    }
  });

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: "Go Serverless v1.0! Your function executed successfully!",
      input: expencesSortedByMonth
    })
  };
};
