
import React from 'react';
import Box from './box';

export default class List extends React.Component {
  componentDidMount() {
    this.props.getSnapshots();
  }

  picturePathHack(picture) {
    let newPath;
    let pPath = picture.path;

    if (pPath.match('^http')) {
      if (pPath.match('localhost')) {
        newPath = 'http://localhost:5000' + pPath;
      } else {
        newPath = pPath;
      }
    } else {
      // newPath = 'https://snapshizzy.herokuapp.com' + pPath;

      newPath = pPath;
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
