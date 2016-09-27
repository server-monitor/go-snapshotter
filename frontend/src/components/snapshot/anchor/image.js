import React from 'react';

import { Image } from 'stardust';

export default class Picture extends React.Component {
  render() {
    return (
      <Image
        src={ this.context.picture.path }
        href={ this.context.url }
        target='_blank'
        className='fluid'
      />
    );

    // return (
    //   <img className="ui fluid image" src={ this.context.picture.path } />
    // );
  }
}

Picture.contextTypes = {
  picture: React.PropTypes.object.isRequired,
  url: React.PropTypes.string.isRequired,
};
