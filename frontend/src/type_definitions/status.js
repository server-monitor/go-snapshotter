import Immutable from 'immutable';

export const REQUEST_STATUS = Immutable.Map({
  initiated: Symbol('request_initiated'),
  success: Symbol('request_success'),
  error: Symbol('request_error'),
  idle: Symbol('request_idle'),
});
