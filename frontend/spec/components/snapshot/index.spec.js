
import React from 'react';
import { expect } from 'chai';

import { Grid, Card } from 'stardust';

/* eslint-disable import/no-unresolved, import/extensions */
import SnapshotIndex from 'components/snapshot/index';
import PictureIndex from 'components/snapshot/picture/index';
import ControlIndex from 'components/snapshot/control/index';
import MetaDataIndex from 'components/snapshot/meta_data/index';
/* eslint-enable */

describe('Snapshot <SnapshotIndex ... />', () => {
  const { Column } = Grid;
  const { shouldEqual, renderReactElement } = SpecHelper;

  const expectedElement = (
    <Column mobile={8} tablet={6} computer={5} largeScreen={4}>
      <Card>
        <PictureIndex />
        <ControlIndex />
        <MetaDataIndex />
      </Card>
    </Column>
  );

  const actual = renderReactElement(
    <SnapshotIndex
      key={10}
      id={10}
      url="https://coboltran.com"
      picture={{}}
      title="I don't know"
      meta={{}}
      removeSnapshot={() => {}}
    />,
  );

  it(shouldEqual(expectedElement), () => {
    expect(actual).to.eql(expectedElement);
  });
});
