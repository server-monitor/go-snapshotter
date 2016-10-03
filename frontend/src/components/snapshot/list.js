
import React, { PropTypes } from 'react';
import { Grid } from 'stardust';

import SnapshotIndex from './index';

// function picturePathHack(picture) {
//   let newPath;
//   const pPath = picture.path;

//   /* eslint-disable global-require, import/no-extraneous-dependencies, import/no-unresolved */
//   // WHY? The back-end hack, no file associated, injected by Webpack externals.
//   const config = getConfig() || require('config');
//   /* eslint-enable */

//   if (config.production) {
//     newPath = pPath;
//   } else if (process.env.LOADED_MOCHA_OPTS) {
//     // If executing under test env (node, npm, mocha currently)...
//     newPath = pPath;
//   } else {
//     // If executing under browser context, no node, no proc env test runner var...
//     newPath = config.backend + pPath;
//   }

//   return {
//     id: picture.id,
//     title: picture.title,
//     filepath: picture.filepath,
//     path: newPath,
//   };
// }

export default class List extends React.Component {
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

List.propTypes = {
  getSnapshots: PropTypes.func.isRequired,
  snapshots: PropTypes.shape().isRequired,
  removeSnapshot: PropTypes.func.isRequired,
};
