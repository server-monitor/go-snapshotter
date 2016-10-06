
import { shallow } from 'enzyme';
import reactTestUtils from 'react-addons-test-utils';
import jsxToString from 'jsx-to-string';

import snapshotsFixture from './snapshots_fixture';

import { info } from '../../src/custom_debug';

export function renderReactElement(rElement, options = null) {
  if (options) {
    return shallow(rElement, options).node;
  }
  const renderer = reactTestUtils.createRenderer();
  renderer.render(rElement);
  return renderer.getRenderOutput();
}

export function shouldEqual(element) {
  const jsxString = jsxToString(element)
                      .replace(/\n/g, '')
                      .replace(/[ ]{2,}/g, '')
                      .replace(/^(.{94}).+$/, '$1 ... LONG, CUT-OFF ...');

  return `should equal "${jsxString}"`;
}

global.SpecHelper = {
  info,
  renderReactElement,
  jsxToString,
  shouldEqual,
  snapshotsFixture,
};
