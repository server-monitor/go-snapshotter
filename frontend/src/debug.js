
// ... HACKs and other nasty stuff.

if (typeof Window !== 'undefined') {
  if (typeof window !== 'undefined') {
    // ... https://stackoverflow.com/questions/33783620/disable-chrome-react-devtools-for-production
    /* eslint-disable no-underscore-dangle */
    window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = () => {}; //  function () {};
    /* eslint-enable */
  } else {
    throw Error('"Window" (upper-case) is defined but window (lower-case) is not');
  }
}

function info(msg, titleArg = '') {
  let title = 'DEBUG';

  if (titleArg) {
    title += ` ${titleArg}...`;
  } else {
    title += ' ...';
  }

  /* eslint-disable no-console */
  [title, msg, '\n\n'].forEach(obj => console.log(obj));
  /* eslint-enable */
}

// Very hacky, terrible, exists so we can use remote, local and normal backends...
// In theory, if executing on the browser, try should not succeed because require is not visible.
//   require is loaded by webpack and this thing is loaded prior to webpack.
function getConfig() {
  let config;

  try {
    config = JSON.parse(
      /* eslint-disable global-require */
      // WHY? The back-end hack, no file associated, injected by Webpack externals.
      require('../webpack.config').externals.config
      /* eslint-enable */
    );

    // return JSON.parse(
    //   require('../webpack.config').externals.config
    // );
  } catch (err) {
    return null;
  }

  return config;
}

// function sleepBlock(ms) {
//   const end = new Date().getTime() + ms;
//   let start = new Date().getTime();

//   while (start < end) {
//     start = new Date().getTime();
//   }
// }

if (typeof module !== 'undefined') {
  module.exports = { info, getConfig };
}
