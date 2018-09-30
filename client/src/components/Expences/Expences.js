import React from 'react';
import AddExpenceForm from './AddExpenceForm';
import CardList from '../CardList/CardList';
import History from './History/History';

import './Expences.css';
// TODO: needs better name and make state
const expencesSortedByMonth = {
  'January': [[], {total: 0}],
  'Febuary': [[], {total: 0}],
  'March': [[], {total: 0}],
  'April': [[], {total: 0}],
  'May': [[], {total: 0}],
  'June': [[], {total: 0}],
  'July': [[], {total: 0}],
  'August': [[], {total: 0}],
  'September': [[], {total: 0}],
  'October': [[], {total: 0}],
  'November': [[], {total: 0}],
  'December':[[], {total: 0}]
};

const months = [
  'January',
  'Febuary',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];




const Expences = ({ expences, handleSelectChange, handleInputChange, currentTag, availableTags, onButtonClickAddExpence, onButtonClickAddNewTag, handleNewTagInputChange }) => {

  expences.map((exp, i) => {
    const date = new Date(expences[i].timestamp)
    const expMonth = months[date.getMonth()]
    return expencesSortedByMonth[expMonth][0].push(expences[i]);
  });

  // Add all expences (amounts) to a respective total (expencesSortedByMonth['month_name'][1].total)
  Object.keys(expencesSortedByMonth).map((month, i) => {
    // If no expences - skip month
    if (expencesSortedByMonth[month][0].length === 0) {
      return false;
    } else {
      return expencesSortedByMonth[month][0].forEach((exp, i) => {
        return expencesSortedByMonth[month][1].total = expencesSortedByMonth[month][1].total + exp.amount
      }
    );
  }
});

  return (
    <div style={{marginTop: '2em'}}>
    <History expencesSortedByMonth={expencesSortedByMonth} months={months}/>
      <CardList expences={expences}/>
      <AddExpenceForm
        expences={expences}
        handleSelectChange={handleSelectChange}
        handleInputChange={handleInputChange}
        onButtonClickAddExpence={onButtonClickAddExpence}
        currentTag={currentTag}
        availableTags={availableTags}
        onButtonClickAddNewTag={onButtonClickAddNewTag}
      />
    </div>
  );
}

export default Expences;
