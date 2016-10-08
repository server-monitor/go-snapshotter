import { SET_REQUEST_STATUS } from './type';

export function setRequestStatus(type, error = null) {
  return {
    type: SET_REQUEST_STATUS,
    payload: { type, error },
  };
}

export default {
  setRequestStatus
};
