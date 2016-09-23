
const Client = {
  makeGetRequest: (options, callback) => {
    const request = require('superagent');

    return request
      .get(options.url)
      .end(callback);
  },

  getSnapshots: (callback) => {
    let urLoc = '/snapshots';

    const config = require('config');
    if (!config.PRODUCTION) {
      urLoc = config.backend + urLoc;
    }

    return Client.makeGetRequest({ url: urLoc }, (err, response) => {
      if (err || !response.ok) {
        throw Error(err);
      }

      callback(JSON.parse(response.text));
    });
  },
};

export default Client;
