
import Client from '../external_data_access/client';
import {
  SET_REQUEST_STATUS,
  REMOVE_SNAPSHOT,
  SET_SNAPSHOTS,
} from './type';

import { ERROR, REQUEST_STATUS } from '../type_definitions/status';

export function getSnapshots() {
  return dispatch => {
    dispatch(setRequestStatus(REQUEST_STATUS.get('initiated')));

    return Client.getSnapshots(
      (error, response) => {
        if (error) {
          return dispatch(setRequestStatus(
            REQUEST_STATUS.get('error'), error
          ));
        }

        dispatch(setRequestStatus(REQUEST_STATUS.get('success')));
        return dispatch(setSnapshots(response));
      }
    );
  };
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

export function setRequestStatus(type, error = null) {
  return {
    type: SET_REQUEST_STATUS,
    payload: { type, error: error },
  };
}
