import React from 'react';
import { expect } from 'chai';

import { Image } from 'stardust';

const { inferImport, shouldEqual, renderReactElement } = SpecHelper;
inferImport();

const PictureIndex = inferImport()[0];

describe('<Picture ... />', function () {
  const picture = { path: '/snapshots/pic.jpg' };
  const url = 'https://elixirlang.org';

  const expectedElement = (
    <div className='picture_container'>
      <Image
        src={ picture.path }
        href={ url }
        target='_blank'
        className='fluid'
      />
    </div>
  );

  it(shouldEqual(expectedElement), function () {
    expect(renderReactElement(
      <PictureIndex />,
      { context: { picture, url } }
    )).to.eql(expectedElement);
  });
});
