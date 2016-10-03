
import Request from 'superagent';

const Client = {
  makeGetRequest: (options, callback) => (
    Request
      .get(options.url)
      .end(callback)
  ),

  getSnapshots: (callback) => {
    // let urLoc = '/snapshots';

    // /* eslint-disable global-require, import/no-extraneous-dependencies, import/no-unresolved */
    // // WHY? The back-end hack, no file associated, injected by Webpack externals.
    // const config = getConfig() || require('config');
    // /* eslint-enable */

    // if (!config.production) urLoc = config.backend + urLoc;

    const urLoc = '/snapshots';
    return Client.makeGetRequest({ url: urLoc }, (error, response) => {
      if (error) {
        callback(error, null);
      } else {
        callback(error, JSON.parse(response.text));
      }
    });
  },
};

export default Client;
