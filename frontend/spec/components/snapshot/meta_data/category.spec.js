import React from 'react';
import { expect } from 'chai';

describe('<Category ... />', () => {
  const { inferImport, shouldEqual, renderReactElement } = SpecHelper;

  const category = 'Some category';
  const expectedElement = <div>Category: { category }</div>;

  it(shouldEqual(expectedElement), () => {
    const Category = inferImport()[0];
    expect(renderReactElement(
      <Category />,
      { context: { meta: { category } } }
    )).to.eql(expectedElement);
  });
});
