import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { IStoreState } from './types';
import { fireReducer } from './reducers';

it('renders without crashing', () => {
  const store = createStore(fireReducer, {
    fireWidth: 50
  } as IStoreState);
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}><App /></Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
