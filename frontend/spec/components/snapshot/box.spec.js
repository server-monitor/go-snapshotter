import React from 'react';
import { expect } from 'chai';

const { inferImport, shouldEqual, renderReactElement } = SpecHelper;

// Same class name hack...
// inferImport();
const imports = inferImport('anchor/box', 'control/box', 'meta_data/box');
const [Box, AnchorBox, ControlBox, MetaDataBox] = imports;

describe('Snapshot <Box ... />', function () {
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
    <div className={ `${mobile} ${tablet} ${computer} ${largeScreen} column` }>
      <div className="card">
        <AnchorBox />
        <ControlBox />
        <MetaDataBox />
      </div>
    </div>
  ); // /

  const urLoc = 'https//erlang.com';
  const actual = renderReactElement(
    <Box />, // /
  );

  // TODO: trying to get rid of test warning (which appears on first run only).
  // Warning: Failed childContext type: Required child context `id` was not specified in `Box`.

  // // .props.children.props.children
  // info(expectedElement, 'expected');
  // info(actual, 'actual');

  it(shouldEqual(expectedElement), function () {
    // expect(renderReactElement(
    //   <Box />, // /
    //   { context: { url: urLoc, picture: { path: '/snapshots/pic.jpg' } } }
    // )).to.eql(expectedElement); // /
    expect(actual).to.eql(expectedElement); // /
  });

  // const expectedElement = (
  //   <div className={ `${mobile} ${tablet} ${computer} ${largeScreen} column` }>
  //     <div className="card">
  //       <AnchorBox url={ url } picture={ picture } />
  //       <MetaDataBox title={ title } meta={ meta } />
  //     </div>
  //   </div>
  // ); // /

  // it(shouldEqual(expectedElement), function () {
  //   expect(renderReactElement(
  //     <Box url={ url } picture={ picture } title={ title } meta={ meta } />
  //   )).to.eql(expectedElement); // /
  // });
});
