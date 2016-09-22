import React from 'react';
import { expect } from 'chai';

const { inferImport, shouldEqual, renderReactElement } = SpecHelper;
inferImport();

describe('<Title ... />', function () {
  const title = 'Some title';
  const expectedElement = <span>{ title }</span>; // /

  it(shouldEqual(expectedElement), function () {
    expect(renderReactElement(
      <Title />, // /
      { context: { title } }
    )).to.eql(expectedElement);
  });
});
