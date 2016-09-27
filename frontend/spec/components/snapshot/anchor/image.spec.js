import React from 'react';
import { expect } from 'chai';

const { inferImport, shouldEqual, renderReactElement } = SpecHelper;
inferImport();

describe('<Image ... />', function () {
  const picture = { path: '/snapshots/pic.jpg' };
  const expectedElement = (
    <img className="ui fluid image" src={ picture.path } />
  );

  it(shouldEqual(expectedElement), function () {
    expect(renderReactElement(
      <Image />,
      { context: { picture } }
    )).to.eql(expectedElement);
  });
});
