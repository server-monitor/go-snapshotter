import React from 'react';

export default class Image extends React.Component {
  render() {
    return (
      <img className="ui fluid image" src={ this.context.picture.path } />
    ); // /
  }
}

Image.contextTypes = {
  picture: React.PropTypes.object.isRequired,
};
