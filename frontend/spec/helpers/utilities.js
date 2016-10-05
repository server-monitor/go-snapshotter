
// Apparently, this isn't used.
// import React from 'react';

import { shallow } from 'enzyme';
import reactTestUtils from 'react-addons-test-utils';
import jsxToString from 'jsx-to-string';

import snapshotsFixture from './snapshots_fixture';

import { info } from '../../src/custom_debug';
// import { info, getConfig } from '../../src/debug';

export function renderReactElement(rElement, options = null) {
  if (options) {
    return shallow(rElement, options).node;
  }
  const renderer = reactTestUtils.createRenderer();
  renderer.render(rElement);
  return renderer.getRenderOutput();
}

// export function jsxToString(jsx) {
//   return jsxToString(jsx);
//   // return require('jsx-to-string')(jsx);
// }

export function shouldEqual(element) {
  const jsxString = jsxToString(element)
                      .replace(/\n/g, '')
                      .replace(/[ ]{2,}/g, '')
                      .replace(/^(.{94}).+$/, '$1 ... LONG, CUT-OFF ...');

  return `should equal "${jsxString}"`;
}

global.info = info;
// global.getConfig = getConfig;

global.SpecHelper = {
  renderReactElement,
  jsxToString,
  shouldEqual,
  snapshotsFixture,
};
