
import React, { PropTypes } from 'react';

export class Remover extends React.Component {
  render() {
    return (
      <button onClick={ () => {
        this.context.removeSnapshot.call(this, this.context.id);
      }}>X</button>
    ); // /
  }
}

Remover.contextTypes = {
  id: PropTypes.number.isRequired,
  removeSnapshot: PropTypes.func.isRequired,
};

export default Remover;
