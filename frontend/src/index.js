
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import './debug';
// require('./debug');

import App from './components/app';
import rootReducer from './reducers';

import './index.less';

const store = createStore(
  rootReducer,
  applyMiddleware(ReduxThunk)
);

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

info(app, 'the app');

ReactDOM.render(
  app,
  document.getElementById('app')
);

// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('app')
// );
