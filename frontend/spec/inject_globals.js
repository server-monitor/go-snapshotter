
// https://github.com/karma-runner/karma/issues/1744

const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

const base = require('../base.config');

const tmp = path.resolve(__dirname, './tmp');

mkdirp(tmp, (err) => {
  if (err) throw Error(err);
});

const globalsFile = path.join(tmp, 'globals.js');
fs.writeFileSync(
  globalsFile,
  '/* eslint-disable no-underscore-dangle */\n' +
    `window.__ENV__ = { production: ${base.production} };\n` +
    '/* eslint-enable */\n'
  ,
  'utf8'
);

module.exports = globalsFile;
