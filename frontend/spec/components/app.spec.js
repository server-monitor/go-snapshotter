import React from 'react';
import { expect } from 'chai';

/* eslint-disable import/no-unresolved, import/extensions */
import App from 'components/app';
import Menu from 'components/menu/index';
import SnapshotList from 'containers/snapshot/list';
import Status from 'containers/status/index';
import DevTools from 'containers/DevTools';
/* eslint-enable */

describe('<App ... />', () => {
  const { shouldEqual, renderReactElement } = SpecHelper;
  let expectedElement;

  if (
    /* eslint-disable no-undef */
    __ENV__.production
    /* eslint-enable */
  ) {
    expectedElement = (
      <div>
        <SnapshotList />
        <Menu />
        <Status />
      </div>
    );
  } else {
    expectedElement = (
      <div>
        <SnapshotList />
        <Menu />
        <Status />
        <DevTools />
      </div>
    );
  }

  it(shouldEqual(expectedElement), () => {
    expect(renderReactElement(<App />)).to.eql(expectedElement);
  });
});
