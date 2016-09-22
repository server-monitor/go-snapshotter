import React from 'react';
import { expect } from 'chai';

const { inferImport, shouldEqual, renderReactElement } = SpecHelper;

// Same class name hack...
// Hack for now. Don't know why this gets lost (overwritten somehow by the
//   other "Box (anchor)"?)
// Ideally, it should just be inferImport('title', 'category');
//   and the Box object is autovivified.
const Box = inferImport('title', 'category')[0];

describe('Meta data <Box ... />', function () {
  const title = 'Matz';
  const category = 'Ruby';
  const meta = { category: category };

  const expectedElement = (
    <div className="meta_data_box">
      <Title />
      <Category />
    </div>
  ); // /

  it(shouldEqual(expectedElement), function () {
    expect(renderReactElement(<Box />)).to.eql(expectedElement);
  });
});
