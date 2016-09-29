export default function snapshotsFixture(callback) {
  // require('./jsdom.js');
  // const jsdom = require('mocha-jsdom');

  // jsdom();

  const config = getConfig() || require('config');

  const host = config.PRODUCTION ? config.prod_test_fixture_backend : config.backend;

  const snapshotsEP = `${host}/snapshots`;
  // const snapshotsEP = host + '/snapshots';

  let request = require('superagent');

  request.get(snapshotsEP).end(
    (err, response) => {
      if (err) throw Error(err);

      const responseText = response.text;
      const snapshots = JSON.parse(responseText);

      if (!snapshots) {
        // console.log('ERROR: JSON parsing of responseText failed...');
        // console.log(responseText);
        throw Error();
      }

      let snapshotsWithPicHack;

      if (config.PRODUCTION) {
        snapshotsWithPicHack = snapshots;
      } else {
        snapshotsWithPicHack = snapshots.map((snapshot) => {
          snapshot.picture.path = `${host}/${snapshot.picture.path}`;
          return snapshot;
        });
      }

      callback(snapshotsWithPicHack);
    }
  );

  // let request = new XMLHttpRequest();
  // request.open('GET', snapshotsEP, false);
  // request.send(null);

  // if (request.status != 200) {
  //   console.log(`ERROR: GET '${snapshotsEP}' failed...`);
  //   console.log(request);

  //   throw Error();
  // }

  // const responseText = request.responseText;
  // const snapshots = JSON.parse(responseText);

  // if (!snapshots) {
  //   console.log('ERROR: JSON parsing of responseText failed...');
  //   console.log(responseText);
  //   throw Error();
  // }

  // if (config.PRODUCTION) return snapshots;

  // return snapshots.map((snapshot) => {
  //   snapshot.picture.path = `${host}/${snapshot.picture.path}`;
  //   return snapshot;
  // });
}
