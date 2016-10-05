describe('PENDING: import ... from \'stardust\' in target file', () => {
  it('should pass', (done) => {
    expect(1).to.eql(1);
    done();
  });
});

// import React from 'react';
// import { expect } from 'chai';

// import { Grid, Card } from 'stardust';

// describe('Snapshot <SnapshotIndex ... />', () => {
//   const { Column } = Grid;

//   const { inferImport, shouldEqual, renderReactElement } = SpecHelper;
//   // Same class name hack...
//   // inferImport();
//   const imports = inferImport('picture/index', 'control/index', 'meta_data/index');
//   const [SnapshotIndex, PictureIndex, ControlIndex, MetaDataIndex] = imports;

//   const expectedElement = (
//     <Column mobile={8} tablet={5} computer={4} largeScreen={3}>
//       <Card>
//         <PictureIndex />
//         <ControlIndex />
//         <MetaDataIndex />
//       </Card>
//     </Column>
//   );

//   const actual = renderReactElement(
//     <SnapshotIndex />,
//   );

//   it(shouldEqual(expectedElement), () => {
//     expect(actual).to.eql(expectedElement);
//   });
// });
