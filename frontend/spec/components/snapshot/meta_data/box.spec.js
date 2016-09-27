import React from 'react';
import { expect } from 'chai';

const { inferImport, shouldEqual, renderReactElement } = SpecHelper;

// Same class name hack...
// Hack for now. Don't know why this gets lost (overwritten somehow by the
//   other "Box (anchor)"?)
// Ideally, it should just be inferImport('title', 'category');
//   and the Box object is autovivified.
// const Box = inferImport('title', 'category', 'current_topic', 'progress')[0];
const imports = inferImport('title', 'category', 'current_topic', 'progress');
const [Box, Title, Category, CurrentTopic, Progress] = imports;

describe('Meta data <Box ... />', function () {
  const title = 'Matz';
  const category = 'Ruby';
  const meta = { category: category };

  const expectedElement = (
    <div className='box'>
      <Title />
      <Category />
      <CurrentTopic />
      <Progress />
    </div>
  );

  it(shouldEqual(expectedElement), function () {
    expect(renderReactElement(<Box />)).to.eql(expectedElement);
  });
});
