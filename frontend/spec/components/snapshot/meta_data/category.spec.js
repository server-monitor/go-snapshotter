import React from 'react';
import { expect } from 'chai';

/* eslint-disable import/no-unresolved, import/extensions */
import Category from 'components/snapshot/meta_data/category';
/* eslint-enable */

describe('<Category ... />', () => {
  const { shouldEqual, renderReactElement } = SpecHelper;

  const category = 'Some category';
  const expectedElement = <div>Category: { category }</div>;

  it(shouldEqual(expectedElement), () => {
    expect(renderReactElement(
      <Category />,
      { context: { meta: { category } } }
    )).to.eql(expectedElement);
  });
});
