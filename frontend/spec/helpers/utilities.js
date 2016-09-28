
import Path from 'path';

import React from 'react';
import { shallow } from 'enzyme';

import snapshotsFixture from './snapshots_fixture';
import { info, getConfig } from '../../src/debug';

export function renderReactElement(rElement, options = null) {
  if (options) {
    return shallow(rElement, options).node;
  } else {
    let renderer = require('react-addons-test-utils').createRenderer();
    renderer.render(rElement);

    return renderer.getRenderOutput();
  }
}

export function jsxToString(jsx) {
  return require('jsx-to-string')(jsx);
}

export function shouldEqual(element) {
  const jsxString = jsxToString(element)
                      .replace(/\n/g, '')
                      .replace(/  /g, '')
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
  const specDirRE = new RegExp('^.*' + specDir());

  // ASSUMPTION: ALL CALLERS are located under the spec dir.
  const defaultSrcFileToImport = callerFile.replace(
    specDirRE, srcDir()).replace(/[.]spec[.]js:\d+:\d+[)]$/, '.js');

  let bnames = [];
  if (bnamesArg.length === 0) {
    bnames = [''];
  } else {
    bnames = ['', ...bnamesArg];
  }

  let imports = [];

  bnames.forEach((bname) => {
    let srcFileToImport = defaultSrcFileToImport;

    if (bname) {
      srcFileToImport = Path.join(Path.dirname(defaultSrcFileToImport), bname + '.js');
    }

    if (!require('fs').existsSync(srcFileToImport)) {
      throw Error(`src file to import '${srcFileToImport}' does not exist`);
    }

    const inflection = require('inflection');
    const infClassName = inflection.camelize(
      Path.basename(srcFileToImport, '.js')
    );

    const reqRet = require(srcFileToImport);
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
