
import Path from 'path';
import FS from 'fs';
import Inflection from 'inflection';

// Apparently, this isn't used.
// import React from 'react';

import { shallow } from 'enzyme';
import reactTestUtils from 'react-addons-test-utils';
import jsxToString from 'jsx-to-string';

import snapshotsFixture from './snapshots_fixture';
import { info, getConfig } from '../../src/debug';

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

export function srcDir() {
  return Path.join(__dirname, '..', '..', 'src');
}

export function specDir() {
  return Path.join(__dirname, '..');
}

export function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function escSpecDir() {
  return escapeRegExp(specDir());
}

export function inferImport(...bnamesArg) {
  const callerFile = new Error().stack.split('\n')[2];
  const specDirRE = new RegExp(`^.*${specDir()}`);

  // ASSUMPTION: ALL CALLERS are located under the spec dir.
  const defaultSrcFileToImport = callerFile.replace(
    specDirRE, srcDir()).replace(/[.]spec[.]js:\d+:\d+[)]$/, '.js');

  let bnames = [];
  if (bnamesArg.length === 0) {
    bnames = [''];
  } else {
    bnames = ['', ...bnamesArg];
  }

  const imports = [];

  bnames.forEach((bname) => {
    let srcFileToImport = defaultSrcFileToImport;

    if (bname) {
      srcFileToImport = Path.join(Path.dirname(defaultSrcFileToImport), `${bname}.js`);
    }

    if (!FS.existsSync(srcFileToImport)) {
      throw Error(`src file to import '${srcFileToImport}' does not exist`);
    }

    const infClassName = Inflection.camelize(
      Path.basename(srcFileToImport, '.js')
    );

    /* eslint-disable import/no-dynamic-require, global-require */
    // WHY? Because this is the thing that allows us the RSpec-y auto import behavior
    const reqRet = require(srcFileToImport);
      /* eslint-enable */
    let iObj;

    if (reqRet.default) {
      iObj = reqRet.default;
    } else {
      iObj = reqRet;
    }

    global[infClassName] = iObj;
    imports.push(iObj);
  });

  return imports;
}

global.info = info;
global.getConfig = getConfig;

global.SpecHelper = {
  renderReactElement,
  jsxToString,
  shouldEqual,
  inferImport,
  snapshotsFixture,
};
