
import React from 'react';
import { Grid, Card } from 'stardust';

import Picture from './picture';
import Control from './control';
import MetaData from './meta_data';

const { Column } = Grid;

export default class SnapshotIndex extends React.Component {
  getChildContext() {
    return {
      id: this.props.id,
      url: this.props.url,
      picture: this.props.picture,
      title: this.props.title,
      meta: this.props.meta,
      removeSnapshot: this.props.removeSnapshot,
    };
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

SnapshotIndex.childContextTypes = {
  id: React.PropTypes.number.isRequired,
  url: React.PropTypes.string.isRequired,
  picture: React.PropTypes.object.isRequired,
  title: React.PropTypes.string.isRequired,
  meta: React.PropTypes.object.isRequired,
  removeSnapshot: React.PropTypes.func.isRequired,
};
