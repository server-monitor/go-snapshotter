import Immutable from 'immutable';

import {
  SET_REQUEST_STATUS,

  // REQUEST_SNAPSHOTS, SET_FETCHING_TO_FALSE,
} from '../actions/type';

export const REQUEST_STATUS = Immutable.Map({
  isFetching: Symbol('isFetching'),
  success: Symbol('success'),
  error: Symbol('error'),
  idle: Symbol('idle'),
});

const requestStatus = (state = REQUEST_STATUS.get('idle'), action) => {
  switch (action.type) {
    case SET_REQUEST_STATUS:
      return action.payload;

    // case REQUEST_SUCCESS:
    //   return requestStatus.success;

    // // case

    // case SET_FETCHING_TO_FALSE:
    //   return false;
    default:
      return state;
  }
};

export default requestStatus;
