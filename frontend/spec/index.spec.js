
// Uncaught Invariant Violation: dangerouslyReplaceNodeWithMarkup(...):
//   Cannot render markup in a worker thread.
//   Make sure `window` and `document` are available globally before requiring React
//     when unit testing or use ReactDOMServer.renderToString() for server rendering.
import './helpers/inject_custom_jsdom';

/* eslint-disable import/imports-first */ // WHY? See ...helpers/jsdom notes above.
import React from 'react';

import ReactDOM from 'react-dom';
// import { expect } from 'chai';

// ...
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

// import { mount, shallow } from 'enzyme';

// import mochaJSDom from 'mocha-jsdom';
/* eslint-enable */

import rootReducer from '../src/reducers';

import App from '../src/components/app';

const store = createStore(
  rootReducer,
  applyMiddleware(ReduxThunk)
);

// const App = SpecHelper.inferImport('./components/app')[1];

// const {
//   inferImport, shouldEqual, renderReactElement,
// } = SpecHelper;

// const imports = inferImport(
//   '../components/menu/index', '../containers/snapshot/list', '../containers/status/index'
// );
// const [App, Menu, SnapshotList, Status] = imports;

describe('<App ... /> (smoke check)', () => {
  // This thing shoves globals like document into the before hook... terrible...
  // mochaJSDom();

  it('should render without crashing', () => {
    const containerNode = document.createElement('div');
    const app = (
      <Provider store={store}>
        <App />
      </Provider>
    );

    info(app, 'the app');

    ReactDOM.render(app, containerNode);

    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      containerNode
    );
  });
});

// TODO: needs Karma
// describe('<App ... /> (deep mount)', () => {
//   // This thing shoves globals like document into the before hook... terrible...
//   // mochaJSDom();


//   // https://github.com/airbnb/enzyme/issues/442
//   // "To reproduce that behavior you need something like webdriver -
//   //  enzyme does not know or care about what pixels are displayed on the screen to the user,
//   //  and does not interpret your CSS."
//   it('should render without errors', () => {
//     // const containerNode = document.createElement('div');
//     const wrapper = mount(
//       <Provider store={store}>
//         <App />
//       </Provider>
//     );

//     const search = '.ui';

//     wrapper.find(search).forEach((node, ix) => {
//       info(node.text(), `text for node ${ix}`);
//       // info(node.hasClass('error'), `'${search}' nodes length`);
//     });

//     // info(wrapper.find(search), 'the app');

//     // info(wrapper.hasClass(search).nodes, `'${search}' nodes length`);
//     // info(wrapper.find(search).hasClass('error'), `'${search}' nodes length`);
//     // info(wrapper.find(search).nodes.length, `'${search}' nodes length`);

//     info(wrapper.find(search).nodes.length, `'${search}' nodes length`);

//     // ReactDOM.render(app, containerNode);

//     // ReactDOM.render(
//     //   <Provider store={store}>
//     //     <App />
//     //   </Provider>,
//     //   containerNode
//     // );
//   });
// });
