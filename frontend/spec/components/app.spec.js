import React from 'react';
import { expect } from 'chai';

/* eslint-disable import/no-unresolved, import/extensions */
import App from 'components/app';
import Menu from 'components/menu/index';
import SnapshotList from 'containers/snapshot/list';
import Status from 'containers/status/index';
/* eslint-enable */

describe('<App ... />', () => {
  const { shouldEqual, renderReactElement } = SpecHelper;
  const expectedElement = (
    <div>
      <SnapshotList />
      <Menu />
      <Status />
    </div>
  );

  it(shouldEqual(expectedElement), () => {
    expect(renderReactElement(<App />)).to.eql(expectedElement);
  });
});
