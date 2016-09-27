import React from 'react';
import { Image } from 'stardust';

export default class Index extends React.Component {
  render() {
    return (
      <div className='picture_container'>
        <Image
          src={ this.context.picture.path }
          href={ this.context.url }
          target='_blank'
          className='fluid'
        />
      </div>
    );
  }
}

Index.contextTypes = {
  picture: React.PropTypes.object.isRequired,
  url: React.PropTypes.string.isRequired,
};
