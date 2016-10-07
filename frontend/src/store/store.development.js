
// https://github.com/gaearon/redux-devtools/tree/master/examples/todomvc
import { createStore, compose, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import { persistState } from 'redux-devtools';

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

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      /* eslint-disable global-require */
      store.replaceReducer(require('../reducers').default)
      /* eslint-enable */
    );
  }

  return store;
}
