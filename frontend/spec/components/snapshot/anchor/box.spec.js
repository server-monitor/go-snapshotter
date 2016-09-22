import React from 'react';
import { expect } from 'chai';

const { inferImport, shouldEqual, renderReactElement } = SpecHelper;

// Same class name hack...
// inferImport('anchor');
const Box = inferImport('anchor')[0];

describe('Anchor <Box ... />', function () {
  const expectedElement = (
    <div className="picture_container">
      <Anchor />
    </div>
  ); // /

  it(shouldEqual(expectedElement), function () {
    expect(renderReactElement(
      <Box />
    )).to.eql(expectedElement); // /
  });
});
