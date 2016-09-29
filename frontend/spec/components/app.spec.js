
'use strict'; /// -------------------- .... /////////////////////

import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';

// ...
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import rootReducer from '../../src/reducers';

const store = createStore(
  rootReducer,
  applyMiddleware(ReduxThunk)
);

// ...

const {
  inferImport, shouldEqual, renderReactElement, snapshotsFixture,
} = SpecHelper;

const imports = inferImport(
  '../components/menu/index', '../containers/snapshot/list', '../containers/status/index'
);
const [App, Menu, SnapshotList, Status] = imports;

describe('<App ... /> (smoke check)', () => {
  const jsdom = require('mocha-jsdom');

  // This thing shoves globals like document into the before hook... terrible...
  jsdom();

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

describe('<App ... />', () => {
  const expectedElement = (
    <div>
      <SnapshotList />
      <Menu />
      <Status />
    </div>
  );

  it(shouldEqual(expectedElement), () => {
    expect(renderReactElement(<App />)).to.eql(expectedElement);
  });
});
