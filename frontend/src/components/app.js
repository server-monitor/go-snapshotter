import React, { Component } from 'react';

import SnapshotList from '../containers/snapshot/list';
import Status from '../containers/status';

export default class App extends Component {
  render() {
    return (
      <div>
        <SnapshotList />
        <Status />
      </div>
    );
  }
}
