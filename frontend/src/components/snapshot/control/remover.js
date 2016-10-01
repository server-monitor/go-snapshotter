
import React, { PropTypes } from 'react';

const Remover = (_, context) => (
  <button
    onClick={() => {
      context.removeSnapshot.call(this, context.id);
    }}
  >
    X
  </button>
);

Remover.contextTypes = {
  id: PropTypes.number.isRequired,
  removeSnapshot: PropTypes.func.isRequired,
};

export default Remover;
