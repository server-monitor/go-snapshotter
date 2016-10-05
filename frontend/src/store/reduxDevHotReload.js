import { createStore, compose, applyMiddleware } from 'redux';
// import { createStore, compose } from 'redux';
import { persistState } from 'redux-devtools';

// import { applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';

const enhancer = compose(
  applyMiddleware(ReduxThunk),
  DevTools.instrument(),
  persistState(
    window.location.href.match(
      /[?&]debug_session=([^&#]+)\b/
    )
  )
);

export default function reduxDevHotReload(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);

  // const store = createStore(
  //   rootReducer,
  //   compose(
  //     applyMiddleware(ReduxThunk),
  //     DevTools.instrument()
  //     )
  //   )

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      /* eslint-disable global-require */
      store.replaceReducer(require('../reducers').default)
      /* eslint-enable */
    );
  }

  return store;
}

// export default function configureStore(initialState) {
//   const store = createStore(rootReducer, initialState, enhancer);

//   if (module.hot) {
//     module.hot.accept('../reducers', () =>
//       store.replaceReducer(require('../reducers').default)
//     );
//   }

//   return store;
// }
