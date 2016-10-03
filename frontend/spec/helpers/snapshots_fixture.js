import Request from 'superagent';

export default function snapshotsFixture(callback) {
  /* eslint-disable global-require, import/no-extraneous-dependencies, import/no-unresolved */
  // WHY? The back-end hack, no file associated, injected by Webpack externals.
  const config = getConfig() || require('config');
  /* eslint-enable */

  const host = config.production ? config.prod_test_fixture_backend : config.backend;

  const snapshotsEP = `${host}/snapshots`;

  // const snapshotsEP = '/snapshots';

  Request.get(snapshotsEP).end(
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

      // callback(snapshots);

      let snapshotsWithPicHack;

      if (config.production) {
        snapshotsWithPicHack = snapshots;
      } else {
        snapshotsWithPicHack = snapshots.map((snapshot) => {
          // !!DEBUG, HACK: watch out for this if Snapshot should
          //   contain any non-JSON.stringifiable keys!!
          const terrible = JSON.parse(JSON.stringify(snapshot));
          terrible.picture.path = `${host}/${snapshot.picture.path}`;
          return terrible;
        });
      }

      callback(snapshotsWithPicHack);
    }
  );
}
