
import Client from '../external_data_access/client';
import {
  SET_REQUEST_STATUS,

  // REQUEST_SNAPSHOTS, RECEIVE_SNAPSHOTS,
  // SET_FETCHING_TO_FALSE,

  REMOVE_SNAPSHOT,
  SET_SNAPSHOTS,
} from './type';

import { REQUEST_STATUS } from '../reducers/requestStatus';

export function getSnapshots() {
  return dispatch => {
    dispatch(setRequestStatus(REQUEST_STATUS.get('isFetching')));

    return Client.getSnapshots(
      (err, response) => {
        if (err) {
          dispatch(setRequestStatus(REQUEST_STATUS.get('error')));
          return dispatch(setError(err));
        }

        dispatch(setRequestStatus(REQUEST_STATUS.get('success')));
        return dispatch(setSnapshots(response));
      }
    );
  };
}

// export function setFetchingToFalse() {
//   return {
//     type: SET_FETCHING_TO_FALSE,
//   };
// }

// export function getSnapshots() {
//   return dispatch => Client.getSnapshots(
//     response => dispatch(setSnapshots(response))
//   );
// }

export function setSnapshots(response) {
  return {
    type: SET_SNAPSHOTS,
    payload: response,
  };
}

export function removeSnapshot(id) {
  return {
    type: REMOVE_SNAPSHOT,
    payload: id,
  };
}

// ...
export function setRequestStatus(status) {
  return {
    type: SET_REQUEST_STATUS,
    payload: status,
  };
}

export function setError(err) {
  return {
    type: ERROR,
    payload: err,
  };
}

// export function receiveSnapshots(response) {
//   return {
//     type: RECEIVE_SNAPSHOTS,
//     payload: snapshots,
//     receivedAt: Date.now(),
//   };
// }

// // TODO
// export function requestError(error) {
//   return {
//     type: REQUEST_ERROR,
//     error,
//   };
// }
