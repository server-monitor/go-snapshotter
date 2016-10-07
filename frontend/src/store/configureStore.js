
if (
  /* eslint-disable no-undef */
  __ENV__.production
  /* eslint-enable */
) {
  /* eslint-disable global-require */
  module.exports = require('./store.production');
  /* eslint-enable */
} else {
  /* eslint-disable global-require */
  module.exports = require('./store.development');
  /* eslint-enable */
}
