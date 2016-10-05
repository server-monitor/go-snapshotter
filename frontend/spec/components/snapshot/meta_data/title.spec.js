import React from 'react';
import { expect } from 'chai';

/* eslint-disable import/no-unresolved, import/extensions */
import Title from 'components/snapshot/meta_data/title';
/* eslint-enable */

describe('<Title ... />', () => {
  const { shouldEqual, renderReactElement } = SpecHelper;

  const title = 'Some title';
  const expectedElement = <div>{ title }</div>;

  it(shouldEqual(expectedElement), () => {
    expect(renderReactElement(
      <Title />,
      { context: { title } }
    )).to.eql(expectedElement);
  });
});
