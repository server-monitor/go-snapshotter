
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

export default Remover;

// export default class Remover extends React.Component {
//   render() {
//     return (
//       <button
//         onClick={() => {
//           this.context.removeSnapshot.call(this, this.context.id);
//         }}
//       >
//         X
//       </button>
//     );
//   }
// }

Remover.contextTypes = {
  id: PropTypes.number.isRequired,
  removeSnapshot: PropTypes.func.isRequired,
};
