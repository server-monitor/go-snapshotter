import React from 'react';
import { expect } from 'chai';

describe('<Title ... />', () => {
  const { inferImport, shouldEqual, renderReactElement } = SpecHelper;

  const title = 'Some title';
  const expectedElement = <div>{ title }</div>;

  it(shouldEqual(expectedElement), () => {
    const Title = inferImport()[0];

    expect(renderReactElement(
      <Title />,
      { context: { title } }
    )).to.eql(expectedElement);
  });
});
