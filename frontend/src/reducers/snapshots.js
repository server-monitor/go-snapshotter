import { SET_SNAPSHOTS, REMOVE_SNAPSHOT } from '../actions/type';

// const snapshot = (state = {}, action) => {
//   switch (action.type) {
//     case REMOVE_SNAPSHOT:
//       return state;
//     default:
//       return state;
//   }
// };

const snapshots = (state = [], action) => {
  switch (action.type) {
    case SET_SNAPSHOTS:
      return action.payload;
    case REMOVE_SNAPSHOT:
      return state.filter((snapshot) => snapshot.id !== action.payload);
    default:
      return state;
  }
};

export default snapshots;
