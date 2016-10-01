import React from 'react';
import { expect } from 'chai';

describe('Meta data <MetadataIndex ... />', () => {
  const { inferImport, shouldEqual, renderReactElement } = SpecHelper;
  // Same class name hack...
  // Hack for now. Don't know why this gets lost (overwritten somehow by the
  //   other "MetadataIndex (anchor)"?)
  // Ideally, it should just be inferImport('title', 'category');
  //   and the MetadataIndex object is autovivified.
  // const MetadataIndex = inferImport('title', 'category', 'current_topic', 'progress')[0];
  const imports = inferImport('title', 'category', 'current_topic', 'progress');
  const [MetadataIndex, Title, Category, CurrentTopic, Progress] = imports;

  const expectedElement = (
    // Used to be ...
    // <div className='index' or 'meta_data'>
    // Changed to ...=undefined because localized CSS => actual = undef...
    <div className={undefined}>
      <Title />
      <Category />
      <CurrentTopic />
      <Progress />
    </div>
  );

  it(shouldEqual(expectedElement), () => {
    expect(renderReactElement(<MetadataIndex />)).to.eql(expectedElement);
  });
});
