describe('PENDING: import ... from \'stardust\' in target file', () => {
  it('should pass', (done) => {
    expect(1).to.eql(1);
    done();
  });
});

// import React from 'react';
// import { expect } from 'chai';

// import { Grid } from 'stardust';

// describe('Snapshots <List ... />', () => {
//   const {
//     inferImport, renderReactElement, snapshotsFixture,
//     // shouldEqual,
//   } = SpecHelper;

//   const imports = inferImport('./index');
//   const [List, SnapshotIndex] = imports;

//   let expectedElement;
//   let snapshotsOutsideTheCallback;

//   // TODO: HACK, fix later...
//   const removeSnapshot = () => {};

//   before((done) => {
//     snapshotsFixture((snapshots) => {
//       snapshotsOutsideTheCallback = snapshots;

//       expectedElement = (
//         <Grid textAlign="center">
//           {
//             snapshots.map((snapshot) => {
//               const { id, url, picture, title, meta } = snapshot;
//               return (
//                 <SnapshotIndex
//                   key={id}
//                   id={id}
//                   url={url}
//                   picture={picture}
//                   title={title}
//                   meta={meta}
//                   removeSnapshot={removeSnapshot}
//                 />
//               );
//             })
//           }
//         </Grid>
//       );

//       done();
//     });
//   });

//   // it(shouldEqual(expectedElement), ... doesn't work outside the callback.
//   it('should equal the expected element (callback)', () => {
//     expect(renderReactElement(
//       <List
//         snapshots={snapshotsOutsideTheCallback}
//         removeSnapshot={removeSnapshot}
//       />
//     )).to.eql(expectedElement);
//   });
// });
