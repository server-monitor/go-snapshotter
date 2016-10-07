
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

// Is there a better way of importing this for Stardust?
import 'semantic-ui-css/semantic.css';

// DEBUG tools, remove later.
import './custom_debug';

// Must be imported after Semantic UI CSS.
import './index.less';

import App from './components/app';

import configureStore from './store/configureStore';

const store = configureStore();
const mountPointID = 'app';

render(
  <AppContainer>
    <Provider store={store}>
      <App />
    </Provider>
  </AppContainer>,
  document.getElementById(mountPointID)
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
      document.getElementById(mountPointID)
    );
  });
}
