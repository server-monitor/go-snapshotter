import { combineReducers } from 'redux';
import snapshots from './snapshots';

const rootReducer = combineReducers({
  snapshots,
});

export default rootReducer;
