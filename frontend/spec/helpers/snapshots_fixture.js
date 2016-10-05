import Request from 'superagent';
import { List as immuList } from 'immutable';

export default function snapshotsFixture(callback) {
  const snapshotsEP = '/snapshots';

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

      callback(immuList(snapshots));
    }
  );
}
