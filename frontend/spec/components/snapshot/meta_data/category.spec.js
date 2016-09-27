import React from 'react';
import { expect } from 'chai';

const { inferImport, shouldEqual, renderReactElement } = SpecHelper;

inferImport();

describe('<Category ... />', function () {
  const category = 'Some category';
  const expectedElement = <div>Category: { category }</div>;

  it(shouldEqual(expectedElement), function () {
    expect(renderReactElement(
      <Category />,
      { context: { meta: { category } } }
    )).to.eql(expectedElement);
  });
});
