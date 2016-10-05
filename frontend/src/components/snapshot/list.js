
import React, { PropTypes } from 'react';
import { Grid } from 'stardust';
import Immutable from 'immutable';

import SnapshotIndex from './index';

export default class SnapshotList extends React.Component {
  componentDidMount() {
    this.props.getSnapshots();
  }

  render() {
    return (
      <Grid textAlign="center">
        {
          this.props.snapshots.map((snapshot) => {
            const { id, url, picture, title, meta } = snapshot;
            return (
              <SnapshotIndex
                key={id}
                id={id}
                url={url}
                picture={picture}
                title={title}
                meta={meta}
                removeSnapshot={this.props.removeSnapshot}
              />
            );
          })
        }
      </Grid>
    );
  }
}

SnapshotList.propTypes = {
  getSnapshots: PropTypes.func.isRequired,
  snapshots: PropTypes.objectOf(Immutable.List).isRequired,
  removeSnapshot: PropTypes.func.isRequired,
};
