import React from 'react';

import Remover from './remover';

export default class Box extends React.Component {
  render() {
    return (
      <div className="control_box">
        <Remover />
      </div>
    );
  }
}
