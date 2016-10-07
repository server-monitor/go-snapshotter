import React from 'react';

import Menu from '../components/menu';
import SnapshotList from '../containers/snapshot/list';
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
