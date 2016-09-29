
import React from 'react';
import { Grid, Card } from 'stardust';

import Picture from './picture';
import Control from './control';
import MetaData from './meta_data';

const { Column } = Grid;

export default class SnapshotIndex extends React.Component {
  getChildContext() {
    /* eslint-disable no-multi-spaces */ // WHY? const/return alignment.
    const  { id, url, picture, title, meta, removeSnapshot } = this.props;
    return { id, url, picture, title, meta, removeSnapshot };
    /* eslint-enable */
  }

  render() {
    return (
      <Column mobile={8} tablet={5} computer={4} largeScreen={3}>
        <Card>
          <Picture />
          <Control />
          <MetaData />
        </Card>
      </Column>
    );
  }
}

SnapshotIndex.propTypes = {
  id: React.PropTypes.number.isRequired,
  url: React.PropTypes.string.isRequired,
  picture: React.PropTypes.shape().isRequired,
  title: React.PropTypes.string.isRequired,
  meta: React.PropTypes.shape.isRequired,
  removeSnapshot: React.PropTypes.func.isRequired,
};

SnapshotIndex.childContextTypes = {
  id: React.PropTypes.number.isRequired,
  url: React.PropTypes.string.isRequired,
  picture: React.PropTypes.object.isRequired,
  title: React.PropTypes.string.isRequired,
  meta: React.PropTypes.object.isRequired,
  removeSnapshot: React.PropTypes.func.isRequired,
};
