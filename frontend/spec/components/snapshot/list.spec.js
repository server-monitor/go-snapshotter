import React from 'react';
import { expect } from 'chai';
import { Grid } from 'stardust';

import { List as ImmuList } from 'immutable';

/* eslint-disable import/no-unresolved, import/extensions */
import SnapshotList from 'components/snapshot/list';
import SnapshotIndex from 'components/snapshot/index';
/* eslint-enable */

describe('Snapshots <List ... />', () => {
  const { renderReactElement, snapshotsFixture } = SpecHelper;

  let expectedElement;
  let snapshotsOutsideTheCallback;

  // TODO: HACK, fix later...
  const removeSnapshot = () => {};

  before((done) => {
    snapshotsFixture((snapshots) => {
      snapshotsOutsideTheCallback = new ImmuList(snapshots);

      expectedElement = (
        <Grid textAlign="center">
          {
            snapshots.map((snapshot) => {
              const { id, url, picture, title, meta } = snapshot;
              return (
                <SnapshotIndex
                  key={id}
                  id={id}
                  url={url}
                  picture={picture}
                  title={title}
                  meta={meta}
                  removeSnapshot={removeSnapshot}
                />
              );
            })
          }
        </Grid>
      );

      done();
    });
  });

  // it(shouldEqual(expectedElement), ... doesn't work outside the callback.
  it('should equal the expected element (callback)', () => {
    expect(renderReactElement(
      <SnapshotList
        snapshots={snapshotsOutsideTheCallback}
        removeSnapshot={removeSnapshot}
        getSnapshots={() => {}}
      />
    )).to.eql(expectedElement);
  });
});
