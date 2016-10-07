import React from 'react';

import Menu from '../components/menu';
import SnapshotList from '../containers/snapshot/list';
import Status from '../containers/status';

const App = () => (
  <div>
    <SnapshotList />
    <Menu />
    <Status />
  </div>
);

export default App;
