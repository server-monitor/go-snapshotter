import { combineReducers } from 'redux';
import snapshots from './snapshots';
import status from './status';
import menu from './menu';

const rootReducer = combineReducers({
  snapshots,
  menu,
  status
});

export default rootReducer;
