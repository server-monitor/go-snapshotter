import React from 'react';
import { expect } from 'chai';

import { Image } from 'stardust';

describe('<Picture ... />', () => {
  const { inferImport, shouldEqual, renderReactElement } = SpecHelper;

  const picture = { path: '/snapshots/pic.jpg' };
  const url = 'https://elixirlang.org';

  const expectedElement = (
    // Used to be ...
    // <div className='picture_container'>
    // Changed to ...=undefined because localized CSS => actual = undef...
    <div className={undefined}>
      <Image
        src={picture.path}
        href={url}
        target="_blank"
        fluid
      />
    </div>
  );

  it(shouldEqual(expectedElement), () => {
    const PictureIndex = inferImport()[0];

    expect(renderReactElement(
      <PictureIndex />,
      { context: { picture, url } }
    )).to.eql(expectedElement);
  });
});
