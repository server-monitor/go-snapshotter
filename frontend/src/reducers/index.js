import { combineReducers } from 'redux';
import snapshots from './snapshots';
import requestStatus from './requestStatus';

const rootReducer = combineReducers({
  snapshots,
  requestStatus,
});

export default rootReducer;
