import Client from '../external_data_access/client';
import { SET_SNAPSHOTS, REMOVE_SNAPSHOT } from './type';

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
