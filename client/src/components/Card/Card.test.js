import { shallow } from 'enzyme';
import React from 'react';
import Card from './Card.js';

it('Expect to render Card component', () => {
  const mockProcessedExpencesArray = {
    allTime: [
      { timestamp: new Date(0), tag: "Food", amount: 400 }
    ]
  }

  const mockClasses = {
    root: {
      flexGrow: 1,
    },
    paper: {
      width: "17em",
      minHeight: '55vh'
    },
    control: {
      padding: '1em',
    },
    emptyList: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: '2em'
    }
  }

  expect(shallow(<Card processedExpences={mockProcessedExpencesArray.allTime} timespan={mockProcessedExpencesArray[0]} classes={mockClasses}/>)).toMatchSnapshot();
})
