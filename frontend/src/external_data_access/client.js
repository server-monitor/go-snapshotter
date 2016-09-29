
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

    if (!config.production) urLoc = config.backend + urLoc;

    return Client.makeGetRequest({ url: urLoc }, (error, response) => {
      let editedRes = null;

      if (error) {
        callback(error, null);
      } else {
        callback(error, JSON.parse(response.text));
      }
    });
  },
};

export default Client;
