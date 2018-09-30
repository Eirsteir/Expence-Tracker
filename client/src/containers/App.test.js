import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

global.window = {}
import 'mock-local-storage'
window.localStorage = global.localStorage

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
