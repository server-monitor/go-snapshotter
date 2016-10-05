import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';

// ...
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

// import { mount } from 'enzyme';

/* eslint-disable import/no-unresolved, import/extensions */
import App from 'components/app';
import Menu from 'components/menu/index';
import SnapshotList from 'containers/snapshot/list';
import Status from 'containers/status/index';
import rootReducer from 'reducers';
/* eslint-enable */

const store = createStore(
  rootReducer,
  applyMiddleware(ReduxThunk)
);

const { shouldEqual, renderReactElement } = SpecHelper;

describe('<App ... /> (deep mount)', () => {
  // This thing shoves globals like document into the before hook... terrible...
  // mochaJSDom();

  it('should render without errors', () => {
    const containerNode = document.createElement('div');

    // const wrapper = mount(
    //   <Provider store={store}>
    //     <App />
    //   </Provider>
    // );

    // const search = 'div';
    // info(wrapper.find(search), 'the app');

    // info(wrapper.find(search).nodes.length, 'the app');

    // ReactDOM.render(app, containerNode);

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
