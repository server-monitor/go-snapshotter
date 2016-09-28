import React from 'react';

import Remover from './remover';
import style from './index.less';

export default class Index extends React.Component {
  render() {
    return (
      <div className={ style.control }>
        <Remover />
      </div>
    );
  }
}
