import React from 'react';
import { expect } from 'chai';

const { inferImport, shouldEqual, renderReactElement } = SpecHelper;

// Same class name hack...
// inferImport();
const imports = inferImport('picture/index', 'control/index', 'meta_data/index');
const [SnapshotIndex, PictureIndex, ControlIndex, MetaDataIndex] = imports;

describe('Snapshot <SnapshotIndex ... />', function () {
  const picture = { path: '/snapshots/pic.jpg' };
  const url = 'https//erlang.com';

  const title = 'Matz';
  const category = 'Ruby';
  const meta = { category: category };

  const mobile = 'eight wide mobile';
  const tablet = 'five wide tablet';
  const computer = 'four wide computer';
  const largeScreen = 'three wide large screen';

  const expectedElement = (
    <div className={ `ui ${mobile} ${tablet} ${computer} ${largeScreen} column` }>
      <div className="card">
        <PictureIndex />
        <ControlIndex />
        <MetaDataIndex />
      </div>
    </div>
  );

  const urLoc = 'https//erlang.com';
  const actual = renderReactElement(
    <SnapshotIndex />,
  );

  // TODO: trying to get rid of test warning (which appears on first run only).
  // Warning: Failed childContext type: Required child
  //   context `id` was not specified in `SnapshotIndex`.

  // // .props.children.props.children
  // info(expectedElement, 'expected');
  // info(actual, 'actual');

  it(shouldEqual(expectedElement), function () {
    // expect(renderReactElement(
    //   <SnapshotIndex />,
    //   { context: { url: urLoc, picture: { path: '/snapshots/pic.jpg' } } }
    // )).to.eql(expectedElement);
    expect(actual).to.eql(expectedElement);
  });

  // const expectedElement = (
  //   <div className={ `${mobile} ${tablet} ${computer} ${largeScreen} column` }>
  //     <div className="card">
  //       <AnchorSnapshotIndex url={ url } picture={ picture } />
  //       <MetaDataIndex title={ title } meta={ meta } />
  //     </div>
  //   </div>
  // );

  // it(shouldEqual(expectedElement), function () {
  //   expect(renderReactElement(
  //     <SnapshotIndex url={ url } picture={ picture } title={ title } meta={ meta } />
  //   )).to.eql(expectedElement);
  // });
});
