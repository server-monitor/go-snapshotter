import { combineReducers } from 'redux';
import snapshots from './snapshots';
import status from './status';

const rootReducer = combineReducers({
  snapshots,
  status,
});

export default rootReducer;
