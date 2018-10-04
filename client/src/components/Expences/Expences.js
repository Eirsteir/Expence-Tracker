import React from "react";
import AddExpenceForm from "./AddExpenceForm";
import CardList from "../CardList/CardList";
import History from "./History/History";

import "./Expences.css";
// TODO: needs better name and make state
// const expencesSortedByMonth = {
//   'January': [[], {total: 0}],
//   'Febuary': [[], {total: 0}],
//   'March': [[], {total: 0}],
//   'April': [[], {total: 0}],
//   'May': [[], {total: 0}],
//   'June': [[], {total: 0}],
//   'July': [[], {total: 0}],
//   'August': [[], {total: 0}],
//   'September': [[], {total: 0}],
//   'October': [[], {total: 0}],
//   'November': [[], {total: 0}],
//   'December':[[], {total: 0}]
// };

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

class Expences extends React.Component {
  state = {
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

  componentDidMount() {
    const { expences } = this.props.user;

    // change policy from admin?
    // fetch('https://364y5aap1g.execute-api.eu-west-2.amazonaws.com/dev/sort-data', {
    //   method: 'post',
    //   mode: 'no-cors',
    //   responseType:'application/json',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(expences)
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data);
    //     // this.setState({data})
    //   })
    //
    // console.log(expences);
    // console.log(expencesSortedByMonth);

    //
    //   this.setState( prevState => ({
    //     ...prevState,
    //     [[expMonth][0]]: [
    //       ...prevState[[expMonth][0]],
    //       expence,
    //       // 1: {...prevState[[expMonth][1]]}
    //     ]
    //   }));
  }

  render() {
    const { loadUser, user } = this.props;
    const { expences } = user;
    const expencesSortedByMonth = this.state;

    // Add all expences (amounts) to a respective total (expencesSortedByMonth['month_name'][1].total)
    return (
      <div style={{ marginTop: "2em" }}>
        <History
          expencesSortedByMonth={expencesSortedByMonth}
          months={months}
          loadUser={loadUser}
          userId={user._id}
        />
        <CardList expences={expences} />
        <AddExpenceForm expences={expences} loadUser={loadUser} user={user} />
      </div>
    );
  }
}

export default Expences;
