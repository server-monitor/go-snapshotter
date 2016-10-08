import React from 'react';

import SnapshotList from '../containers/snapshot/list';
import Menu from '../containers/menu';
import Status from '../containers/status';

const App = () => (
  <div>
    <SnapshotList />
    <Menu />
    <Status />
  </div>
);

export default App;
