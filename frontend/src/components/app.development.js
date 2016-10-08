import React from 'react';

import SnapshotList from '../containers/snapshot/list';
import Menu from '../containers/menu';
import Status from '../containers/status';

import DevTools from '../containers/DevTools';

const App = () => (
  <div>
    <SnapshotList />
    <Menu />
    <Status />
    <DevTools />
  </div>
);

export default App;
