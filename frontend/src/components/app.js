import React, { Component } from 'react';

// Is there a way to not include this for Stardust or is this really necessary?
import 'semantic-ui-css/semantic.css';

import Menu from '../components/menu';
import SnapshotList from '../containers/snapshot/list';
import Status from '../containers/status';

export default class App extends Component {
  render() {
    return (
      <div>
        <SnapshotList />
        <Menu />
        <Status />
      </div>
    );
  }
}
