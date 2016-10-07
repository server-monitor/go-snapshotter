
import React from 'react';

import ReactDOM from 'react-dom';
import { expect } from 'chai';

// ...
import { createStore, compose, applyMiddleware } from 'redux';
import { persistState } from 'redux-devtools';

import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import * as Enzyme from 'enzyme';

/* eslint-disable import/no-unresolved, import/extensions */
import App from 'components/app';
import rootReducer from 'reducers';
import DevTools from 'containers/DevTools';
/* eslint-enable */

const enhancer = compose(
  applyMiddleware(ReduxThunk),
  DevTools.instrument(),
  persistState(
    window.location.href.match(
      /[?&]debug_session=([^&#]+)\b/
    )
  )
);

const store = createStore(rootReducer, enhancer);

describe('<App ... /> (smoke check)', () => {
  it('should render without crashing', () => {
    const containerNode = document.createElement('div');

    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      containerNode
    );
  });
});

describe('<App ... /> (deep mount)', () => {
  // https://github.com/airbnb/enzyme/issues/442
  // "To reproduce that behavior you need something like webdriver -
  //  enzyme does not know or care about what pixels are displayed on the screen to the user,
  //  and does not interpret your CSS."
  it('should render without errors', () => {
    const wrapper = Enzyme.render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const search = '.error';
    const result = wrapper.find(search);

    expect(result).to.have.length(0);
  });
});
