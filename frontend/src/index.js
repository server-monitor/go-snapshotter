
import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import { AppContainer } from 'react-hot-loader';

import './custom_debug';

import App from './components/app';
import rootReducer from './reducers';

import './index.less';

import reduxDevHotReload from './store/reduxDevHotReload';

const store = reduxDevHotReload();
// const store = createStore(
//   rootReducer,
//   applyMiddleware(ReduxThunk)
// );

// START: DUMMY, WORKS...
// const Dumdum = require('./dumdum').default;

// // render(
// //   <Dumdum />,
// //   document.getElementById('app')
// // );

// render(
//   <AppContainer>
//     <Dumdum />
//   </AppContainer>,
//   document.getElementById('app')
// );

// if (module.hot) {
//   module.hot.accept('./dumdum', () => {
//     /* eslint-disable global-require */
//     const DCont = require('./dumdum').default;
//     /* eslint-enable */

//     render(
//       <AppContainer>
//         <DCont />
//       </AppContainer>,
//       document.getElementById('app')
//     );
//   });
// }
// END: DUMMY

render(
  <AppContainer>
    <Provider store={store}>
      <App />
    </Provider>
  </AppContainer>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./components/app', () => {
    /* eslint-disable global-require */
    const HotApp = require('./components/app').default;
    /* eslint-enable */

    render(
      <AppContainer>
        <Provider store={store}>
          <HotApp />
        </Provider>
      </AppContainer>,
      document.getElementById('app')
    );
  });
}

// Original
// render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('app')
// );
