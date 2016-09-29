import React, { PropTypes } from 'react';
import { Image } from 'stardust';

import style from './index.less';

const Index = (_, context) => (
  <div className={style.picture_container}>
    <Image
      src={context.picture.path}
      href={context.url}
      target="_blank"
      fluid
    />
  </div>
);

Index.contextTypes = {
  picture: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired,
};

export default Index;
