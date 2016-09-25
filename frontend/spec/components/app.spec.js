'use strict';

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

const imports = inferImport('../containers/snapshot/list', '../containers/status/index');

const [App, SnapshotList, Status] = imports;

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

describe('<App ... />', () => {
  const snapshots = snapshotsFixture();
  const expectedElement = (
    <div>
      <SnapshotList />
      <Status />
    </div>
  );

  it(shouldEqual(expectedElement), function () {
    expect(renderReactElement(<App />)).to.eql(expectedElement);
  });
});
