describe('PENDING: import ... from \'stardust\' in target file', () => {
  it('should pass', (done) => {
    expect(1).to.eql(1);
    done();
  });
});

// // Uncaught Invariant Violation: dangerouslyReplaceNodeWithMarkup(...):
// //   Cannot render markup in a worker thread.
// //   Make sure `window` and `document` are available globally before requiring React
// //     when unit testing or use ReactDOMServer.renderToString() for server rendering.
// // import '../helpers/inject_custom_jsdom';

// /* eslint-disable import/imports-first */ // WHY? See ...helpers/jsdom notes above.
// import React from 'react';
// // import ReactDOM from 'react-dom';
// import { expect } from 'chai';

// // ...
// // import { createStore, applyMiddleware } from 'redux';
// // import { Provider } from 'react-redux';
// // import ReduxThunk from 'redux-thunk';

// // import { mount } from 'enzyme';

// // import mochaJSDom from 'mocha-jsdom';
// /* eslint-enable */

// // import rootReducer from '../../src/reducers';

// // const store = createStore(
// //   rootReducer,
// //   applyMiddleware(ReduxThunk)
// // );

// /* eslint-disable import/no-unresolved, import/extensions */
// import App from 'components/app';
// import Menu from 'components/menu/index';
// import SnapshotList from 'containers/snapshot/list';
// import Status from 'containers/status/index';
// /* eslint-enable */

// const { shouldEqual, renderReactElement } = SpecHelper;

// // describe('<App ... /> (smoke check)', () => {
// //   // This thing shoves globals like document into the before hook... terrible...
// //   // mochaJSDom();

// //   it('should render without crashing', () => {
// //     const containerNode = document.createElement('div');
// //     const app = (
// //       <Provider store={store}>
// //         <App />
// //       </Provider>
// //     );

// //     info(app, 'the app');

// //     ReactDOM.render(app, containerNode);

// //     // ReactDOM.render(
// //     //   <Provider store={store}>
// //     //     <App />
// //     //   </Provider>,
// //     //   containerNode
// //     // );
// //   });
// // });

// // describe('<App ... /> (deep mount)', () => {
// //   // This thing shoves globals like document into the before hook... terrible...
// //   // mochaJSDom();

// //   it('should render without errors', () => {
// //     // const containerNode = document.createElement('div');
// //     const wrapper = mount(
// //       <Provider store={store}>
// //         <App />
// //       </Provider>
// //     );

// //     const search = 'div';
// //     info(wrapper.find(search), 'the app');

// //     info(wrapper.find(search).nodes.length, 'the app');

// //     // ReactDOM.render(app, containerNode);

// //     // ReactDOM.render(
// //     //   <Provider store={store}>
// //     //     <App />
// //     //   </Provider>,
// //     //   containerNode
// //     // );
// //   });
// // });

// describe('<App ... />', () => {
//   const expectedElement = (
//     <div>
//       <SnapshotList />
//       <Menu />
//       <Status />
//     </div>
//   );

//   it(shouldEqual(expectedElement), () => {
//     expect(renderReactElement(<App />)).to.eql(expectedElement);
//   });
// });
