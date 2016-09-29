export default function snapshotsFixture(callback) {
  const config = getConfig() || require('config');

  const host = config.production ? config.prod_test_fixture_backend : config.backend;

  const snapshotsEP = `${host}/snapshots`;

  let request = require('superagent');

  request.get(snapshotsEP).end(
    (err, response) => {
      if (err) throw Error(err);

      const responseText = response.text;
      const snapshots = JSON.parse(responseText);

      if (!snapshots) {
        /* eslint-disable no-console */
        //   WHY? Error does not display objects more accurately than console.log.
        console.log('ERROR: JSON parsing of responseText failed...');
        console.log(responseText);
        /* eslint-enable */
        throw Error('See console log ^^^');
      }

      let snapshotsWithPicHack;

      if (config.production) {
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
}
