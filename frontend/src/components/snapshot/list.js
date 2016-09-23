
import React from 'react';
import Box from './box';

export default class List extends React.Component {
  componentDidMount() {
    this.props.getSnapshots();
  }

  picturePathHack(picture) {
    let newPath;
    let pPath = picture.path;

    const config = getConfig() || require('config');

    if (config.PRODUCTION) {
      newPath = pPath;
    } else {
      if (process.env.LOADED_MOCHA_OPTS) {
        // If executing under test env (node, npm, mocha currently)...
        newPath = pPath;
      } else {
        // If executing under browser contex,t no node, no proc env test runner var...
        newPath = config.backend + pPath;
      }
    }

    return {
      id: picture.id,
      title: picture.title,
      filepath: picture.filepath,
      path: newPath,
    };
  }

  render() {
    return (
      <div className="ui center aligned grid snapshots_list">
        {
          this.props.snapshots.map((snapshot) => {
            const { id, url, picture, title, meta } = snapshot;
            return (
              <Box key={ id }
                id={ id }
                url={ url }
                picture={ this.picturePathHack(picture) }
                title={ title }
                meta={ meta }
                removeSnapshot={ this.props.removeSnapshot }
              />
            );
          })
        }
      </div>
    ); // /
  }
}
