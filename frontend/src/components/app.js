
if (
  /* eslint-disable no-undef */
  __ENV__.production
  /* eslint-enable */
) {
  /* eslint-disable global-require */
  module.exports = require('./app.production.js');
  /* eslint-enable */
} else {
  /* eslint-disable global-require */
  module.exports = require('./app.development.js');
  /* eslint-enable */
}
