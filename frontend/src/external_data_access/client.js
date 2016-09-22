
const Client = {
  makeGetRequest: (options, callback) => {
    const request = require('superagent');

    return request
      .get(options.url)
      .end(callback);
  },

  getSnapshots: (callback) => {
    // const urLoc = 'https://snapshizzy.herokuapp.com/snapshots';

    // const urLoc = 'http://localhost:5000/snapshots';

    const urLoc = '/snapshots';

    return Client.makeGetRequest({ url: urLoc }, (err, response) => {
      if (err || !response.ok) {
        throw Error(err);
      }

      callback(JSON.parse(response.text));
    });
  },
};

export default Client;
