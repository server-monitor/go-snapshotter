import React from 'react';
import { expect } from 'chai';

import { Image } from 'stardust';

const { inferImport, shouldEqual, renderReactElement } = SpecHelper;
const Picture = inferImport()[0];

describe('<Picture ... />', function () {
  const picture = { path: '/snapshots/pic.jpg' };
  const url = 'https://elixirlang.org';

  const expectedElement = (
    <Image
      src={ picture.path }
      href={ url }
      target='_blank'
      className='fluid'
    />
  );

  it(shouldEqual(expectedElement), function () {
    expect(renderReactElement(
      <Picture />,
      { context: { picture, url } }
    )).to.eql(expectedElement);
  });
});

// describe('<Image ... />', function () {
//   const picture = { path: '/snapshots/pic.jpg' };
//   const expectedElement = (
//     <img className="ui fluid image" src={ picture.path } />
//   );

//   it(shouldEqual(expectedElement), function () {
//     expect(renderReactElement(
//       <Image />,
//       { context: { picture } }
//     )).to.eql(expectedElement);
//   });
// });
