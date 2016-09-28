import React from 'react';
import { Image } from 'stardust';

import style from './index.less';

export default class Index extends React.Component {
  render() {
    return (
      <div className={ style.picture_container }>
        <Image
          src={ this.context.picture.path }
          href={ this.context.url }
          target='_blank'
          fluid
        />
      </div>
    );
  }
}

Index.contextTypes = {
  picture: React.PropTypes.object.isRequired,
  url: React.PropTypes.string.isRequired,
};
