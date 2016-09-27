import React from 'react';
import { expect } from 'chai';

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
    <div className="ui center aligned grid">
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
    </div>
  );

  it(shouldEqual(expectedElement), function () {
    expect(renderReactElement(
      <List snapshots={ snapshots } removeSnapshot={ removeSnapshot } />
    )).to.eql(expectedElement);
  });
});
