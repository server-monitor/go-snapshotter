import { SET_REQUEST_STATUS } from '../actions/type';
import { REQUEST_STATUS } from '../type_definitions/status';

const status = (state = REQUEST_STATUS.get('idle'), action) => {
  switch (action.type) {
    case SET_REQUEST_STATUS:
      return action.payload;

    default:
      return state;
  }
};

export default status;
