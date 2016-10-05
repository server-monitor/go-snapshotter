// import * as Stardust from 'stardust';
// const Image = require('stardust');

describe('PENDING: import ... from \'stardust\' in target file', () => {
  it('should pass', (done) => {
    expect(1).to.eql(1);
    done();
  });
});

// import React from 'react';
// import { expect } from 'chai';

// const Image = require('stardust');
// import { Image } from 'stardust';

// /* eslint-disable import/no-unresolved, import/extensions */
// import PictureIndex from 'components/snapshot/picture/index';
// /* eslint-enable */

// describe('<Picture ... />', () => {
//   const { shouldEqual, renderReactElement } = SpecHelper;

//   const picture = { path: '/snapshots/pic.jpg' };
//   const url = 'https://elixirlang.org';

//   const expectedElement = (
//     // Used to be ...
//     // <div className='picture_container'>
//     // Changed to ...=undefined because localized CSS => actual = undef...
//     // Watch out for className, you may have to change to actual value now
//     //   if using Karma.
//     <div className={undefined}>
//       <Image
//         src={picture.path}
//         href={url}
//         target="_blank"
//         fluid
//       />
//     </div>
//   );

//   it(shouldEqual(expectedElement), () => {
//     // expect(renderReactElement(
//     //   <PictureIndex />,
//     //   { context: { picture, url } }
//     // )).to.eql(expectedElement);
//   });
// });
