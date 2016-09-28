import React from 'react';
import { expect } from 'chai';

import { Grid, Card } from 'stardust';
const { Column } = Grid;

const { inferImport, shouldEqual, renderReactElement } = SpecHelper;

// Same class name hack...
// inferImport();
const imports = inferImport('picture/index', 'control/index', 'meta_data/index');
const [SnapshotIndex, PictureIndex, ControlIndex, MetaDataIndex] = imports;

describe('Snapshot <SnapshotIndex ... />', function () {
  const picture = { path: '/snapshots/pic.jpg' };
  const url = 'https//erlang.com';

  const title = 'Matz';
  const category = 'Ruby';
  const meta = { category: category };

  const mobile = 'eight wide mobile';
  const tablet = 'five wide tablet';
  const computer = 'four wide computer';
  const largeScreen = 'three wide large screen';

  const expectedElement = (
    <Column mobile={8} tablet={5} computer={4} largeScreen={3}>
      <Card>
        <PictureIndex />
        <ControlIndex />
        <MetaDataIndex />
      </Card>
    </Column>
  );

  const urLoc = 'https//erlang.com';
  const actual = renderReactElement(
    <SnapshotIndex />,
  );

  it(shouldEqual(expectedElement), function () {
    expect(actual).to.eql(expectedElement);
  });
});
