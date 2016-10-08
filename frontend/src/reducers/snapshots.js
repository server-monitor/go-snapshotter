
import { List as immuList } from 'immutable';

import {
  REMOVE_SNAPSHOT,
  SET_SNAPSHOTS,
} from '../actions/type';

const snapshots = (state = immuList(), action) => {
  switch (action.type) {
  case REMOVE_SNAPSHOT:
    return state.toSeq().filter(snapshot => snapshot.id !== action.payload).toList();

  case SET_SNAPSHOTS:
    return immuList(action.payload);

  default:
    return state;
  }
};

export default snapshots;
