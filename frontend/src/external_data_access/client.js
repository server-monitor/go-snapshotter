
const Client = {
  makeGetRequest: (options, callback) => {
    const request = require('superagent');

    return request
      .get(options.url)
      .end(callback);
  },

  getSnapshots: (callback) => {
    let urLoc = '/snapshots';

    const config = getConfig() || require('config');

    if (!config.PRODUCTION) {
      urLoc = config.backend + urLoc;
    }

    return Client.makeGetRequest({ url: urLoc }, (err, response) => {
      callback(err, JSON.parse(response.text));
    });
  },
};

export default Client;
