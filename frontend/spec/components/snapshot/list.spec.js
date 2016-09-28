import React from 'react';
import { expect } from 'chai';

import { Grid } from 'stardust';

const {
  inferImport, shouldEqual, renderReactElement, snapshotsFixture,
} = SpecHelper;

const imports = inferImport('./index');
const [List, SnapshotIndex] = imports;

describe('Snapshots <List ... />', function () {
  const snapshots = snapshotsFixture();

  // TODO: HACK, fix later...
  const removeSnapshot = () => {};

  const expectedElement = (
    <Grid textAlign='center'>
      {
        snapshots.map((snapshot) => {
          const { id, url, picture, title, meta } = snapshot;
          return (
            <SnapshotIndex key={ id }
              id={ id }
              url={ url }
              picture={ picture }
              title={ title }
              meta={ meta }
              removeSnapshot={ removeSnapshot }
            />
          );
        })
      }
    </Grid>
  );

  it(shouldEqual(expectedElement), function () {
    expect(renderReactElement(
      <List snapshots={ snapshots } removeSnapshot={ removeSnapshot } />
    )).to.eql(expectedElement);
  });
});
