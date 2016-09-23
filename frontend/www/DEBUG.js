
// ... HACKs and other nasty stuff.

if (typeof Window !== 'undefined') {
  if (typeof window !== 'undefined') {

    // ... https://stackoverflow.com/questions/33783620/disable-chrome-react-devtools-for-production
    window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = function () {};
  } else {
    throw Error('"Window" (upper-case) is defined but window (lower-case) is not');
  }
}

function info(msg, titleArg = '') {
  var title = 'DEBUG';

  if (titleArg) {
    title += ` ${titleArg}...`;
  } else {
    title += ' ...';
  }

  [title, msg, '\n\n'].forEach((obj) => console.log(obj));
}

// Very hacky, terrible, exists so we can use remote, local and normal backends...
// In theory, if executing on the browser, try should not succeed because require is not visible.
//   require is loaded by webpack and this thing is loaded prior to webpack.
function getConfig() {
  var config;

  try {
    return JSON.parse(
      require('../webpack.config').externals.config
    );
  } catch (err) {
    return;
  }

  return config;
}

function sleepBlock(ms) {
  var end = new Date().getTime() + ms;
  var start = new Date().getTime();

  while (start < end) {
    start = new Date().getTime();
  }
}

if (typeof module !== 'undefined') {
  module.exports = {
    info: info,
    getConfig: getConfig,
  };
}
