import React from 'react';
import { expect } from 'chai';

const { inferImport, shouldEqual, renderReactElement } = SpecHelper;
inferImport('image');

describe('<Anchor ... />', function () {
  const urLoc = 'https//erlang.com';

  const expectedElement = (
    <a href={ urLoc } target="_blank">
      <Image />
    </a>
  );

  it(shouldEqual(expectedElement), function () {
    expect(renderReactElement(
      <Anchor />,
      { context: { url: urLoc, picture: { path: '/snapshots/pic.jpg' } } }
    )).to.eql(expectedElement);
  });
});
