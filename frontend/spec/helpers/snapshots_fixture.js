export default function snapshotsFixture() {
  const config = getConfig() || require('config');
  const host = config.PRODUCTION ? '' : config.backend;

  let request = new XMLHttpRequest();

  const snapshotsEP = host + '/snapshots';
  request.open('GET', snapshotsEP, false);
  request.send(null);

  if (request.status != 200) {
    console.log(`ERROR: GET '${snapshotsEP}' failed...`);
    console.log(request);

    throw Error();
  }

  const responseText = request.responseText;
  const snapshots = JSON.parse(responseText);

  if (!snapshots) {
    console.log('ERROR: JSON parsing of responseText failed...');
    console.log(responseText);
    throw Error();
  }

  if (config.PRODUCTION) return snapshots;

  return snapshots.map((snapshot) => {
    snapshot.picture.path = `${host}/${snapshot.picture.path}`;
    return snapshot;
  });
}
