import React from 'react';
import { expect } from 'chai';

const { inferImport, shouldEqual, renderReactElement } = SpecHelper;

// Same class name hack...
// Hack for now. Don't know why this gets lost (overwritten somehow by the
//   other "MetadataIndex (anchor)"?)
// Ideally, it should just be inferImport('title', 'category');
//   and the MetadataIndex object is autovivified.
// const MetadataIndex = inferImport('title', 'category', 'current_topic', 'progress')[0];
const imports = inferImport('title', 'category', 'current_topic', 'progress');
const [MetadataIndex, Title, Category, CurrentTopic, Progress] = imports;

describe('Meta data <MetadataIndex ... />', function () {
  const title = 'Matz';
  const category = 'Ruby';
  const meta = { category: category };

  const expectedElement = (
    <div className='index'>
      <Title />
      <Category />
      <CurrentTopic />
      <Progress />
    </div>
  );

  it(shouldEqual(expectedElement), function () {
    expect(renderReactElement(<MetadataIndex />)).to.eql(expectedElement);
  });
});
