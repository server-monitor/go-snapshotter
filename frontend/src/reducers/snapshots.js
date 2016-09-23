import * as Immutable from 'immutable';

import {
  REQUEST_SNAPSHOTS, RECEIVE_SNAPSHOTS,
  REMOVE_SNAPSHOT,
  SET_SNAPSHOTS,
} from '../actions/type';

// const snapshot = (state = {}, action) => {
//   switch (action.type) {
//     case REMOVE_SNAPSHOT:
//       return state;
//     default:
//       return state;
//   }
// };

// const snapshots = (state = [], action) => {
//   switch (action.type) {
//     case REQUEST_SNAPSHOTS:
//       return state;
//     case REMOVE_SNAPSHOT:
//       return state.filter((snapshot) => snapshot.id !== action.payload);
//     case SET_SNAPSHOTS:
//       return action.payload;
//     default:
//       return state;
//   }
// };

const snapshots = (state = Immutable.List(), action) => {
  switch (action.type) {
    case REQUEST_SNAPSHOTS:
      return state;
    case REMOVE_SNAPSHOT:
      return state.toSeq().filter((snapshot) => snapshot.id !== action.payload);

      // return state.filter((snapshot) => snapshot.id !== action.payload);
    case SET_SNAPSHOTS:
      return action.payload;
    default:
      return state;
  }
};

export default snapshots;
