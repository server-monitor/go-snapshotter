'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';

const {
  inferImport, shouldEqual, renderReactElement, snapshotsFixture,
} = SpecHelper;

const imports = inferImport('../containers/snapshot/list');

const [App, SnapshotList] = imports;

// describe('<App ... /> (smoke check)', () => {
//   it('should render without crashing', () => {
//     const containerNode = document.createElement('div');
//     ReactDOM.render(<App />, containerNode);
//   });
// });

describe('<App ... />', () => {
  const snapshots = snapshotsFixture();
  const expectedElement = (
    <div>
      <SnapshotList />
    </div>
  ); // /

  it(shouldEqual(expectedElement), function () {
    expect(renderReactElement(
      <App />
    )).to.eql(expectedElement); // /
  });
});
