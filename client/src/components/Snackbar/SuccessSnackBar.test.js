import { shallow } from 'enzyme';
import React from 'react';
import SuccessSnackBar from './SuccessSnackBar';

it('expect to render SuccessSnackBar component', () => {

  expect(shallow(<SuccessSnackBar />)).toMatchSnapshot();
});

// it('should toggle SuccessSnackBar components open state when clicking on add button', () => {
//
//   const mockOnButtonClick = () => {
//     return false
//   }
//
//   const wrapper = shallow(<SuccessSnackBar onButtonClickAddExpence={mockOnButtonClick} />);
//   console.log(wrapper);
//   const button = wrapper.find('Button');
//
//   button.simulate('click');
//   expect(button.props().open).toEqual(true);
// })
