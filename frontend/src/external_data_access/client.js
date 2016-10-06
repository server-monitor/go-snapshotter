
import Request from 'superagent';

const Client = {
  makeGetRequest: (options, callback) => (
    Request
      .get(options.url)
      .end(callback)
  ),

  getSnapshots: (callback) => {
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
