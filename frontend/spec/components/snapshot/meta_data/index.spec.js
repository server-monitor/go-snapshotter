import React from 'react';
import { expect } from 'chai';

/* eslint-disable import/no-unresolved, import/extensions */
import MetadataIndex from 'components/snapshot/meta_data/index';
import Title from 'components/snapshot/meta_data/title';
import Category from 'components/snapshot/meta_data/category';
import CurrentTopic from 'components/snapshot/meta_data/current_topic';
import Progress from 'components/snapshot/meta_data/progress';

import style from 'components/snapshot/meta_data/index.less';
/* eslint-enable */

describe('Meta data <MetadataIndex ... />', () => {
  const { shouldEqual, renderReactElement } = SpecHelper;

  const expectedElement = (
    // Used to be ...
    // <div className='index' or 'meta_data'>
    // Changed to ...=undefined because localized CSS => actual = undef...
    <div className={style.meta_data}>
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
