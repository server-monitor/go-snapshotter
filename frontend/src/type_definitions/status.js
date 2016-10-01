import { Map as immuMap } from 'immutable';

export const REQUEST_STATUS = immuMap({
  initiated: Symbol('request_initiated'),
  success: Symbol('request_success'),
  error: Symbol('request_error'),
  idle: Symbol('request_idle'),
});

export default { REQUEST_STATUS };
