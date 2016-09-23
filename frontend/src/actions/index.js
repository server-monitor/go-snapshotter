
import Client from '../external_data_access/client';
import {
  REQUEST_SNAPSHOTS, RECEIVE_SNAPSHOTS,
  REMOVE_SNAPSHOT,
  SET_SNAPSHOTS,
} from './type';

export function getSnapshots() {
  return dispatch => Client.getSnapshots(
    response => dispatch(setSnapshots(response))
  );
}

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
export function requestSnapshots() {
  return {
    type: REQUEST_SNAPSHOTS,
  };
}

export function receiveSnapshots(response) {
  return {
    type: RECEIVE_SNAPSHOTS,
    payload: snapshots,
    receivedAt: Date.now(),
  };
}

// // TODO
// export function requestError(error) {
//   return {
//     type: REQUEST_ERROR,
//     error,
//   };
// }
