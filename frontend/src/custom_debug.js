
// // ... HACKs and other nasty stuff.

// if (typeof Window !== 'undefined') {
//   if (typeof window !== 'undefined') {
//     // ... https://stackoverflow.com/questions/33783620/disable-chrome-react-devtools-for-production
//    /* eslint-disable no-underscore-dangle */
//    window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = () => {}; //  function () {};
//    /* eslint-enable */
//   } else {
//     throw Error('"Window" (upper-case) is defined but window (lower-case) is not');
//   }
// }

// import webpack from 'webpack';

// I don't know..., check if browser.
// Node has process.env => keys.length > 0 defined.
function browserContext() {
  if (typeof process === 'undefined') return true;
  return (Object.keys(process.env).length === 0) && (process.env.constructor === Object);
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

// // Very hacky, terrible, exists so we can use remote, local and normal backends...
// // In theory, if executing on the browser, try should not succeed because require is not visible.
// //   require is loaded by webpack and this thing is loaded prior to webpack.
// function getConfig() {
//   // Terrible hack, see if browser or Node/test/mocha...

//   // console.log('proc env');
//   // console.log(process.env);
//   // let fileOrPackage = 'config';
//   if (browserContext()) return null;

//   /* eslint-disable global-require */
//   return require('../envParamsHack');
//   /* eslint-enable */

//   // return ({
//   //   production: false,
//   //   prod_test_fixture_backend: 'http://localhost:5000',

//   //   // backend: 'https://snapshizzy.herokuapp.com',
//   //   backend: 'http://localhost:5000'
//   // });

//   // let configStr;
//   // webpack({
//   //   quiet: true,
//   //   // config: require('../webpack.config').externals.config,
//   // }, (err, stats) => {
//   //   console.log(err);
//   //   console.log(stats);
//   // });

//   // return JSON.parse(configStr);

//   // return JSON.parse(
//   //   /* eslint-disable global-require */
//   //   // WHY? The back-end hack, no file associated, injected by Webpack externals.\
//   //   // require(fileOrPackage).externals.config

//   //   // This will f**k things up.
//   //   // require('../webpack.config').externals.config

//   //   /* eslint-enable */
//   // );

//   // let config;

//   // try {
//   //   config = JSON.parse(
//   //     /* eslint-disable global-require */
//   //     // WHY? The back-end hack, no file associated, injected by Webpack externals.
//   //     require('../webpack.config').externals.config
//   //     /* eslint-enable */
//   //   );

//   //   // return JSON.parse(
//   //   //   require('../webpack.config').externals.config
//   //   // );
//   // } catch (err) {
//   //   return null;
//   // }

//   // return config;
// }

// function sleepBlock(ms) {
//   const end = new Date().getTime() + ms;
//   let start = new Date().getTime();

//   while (start < end) {
//     start = new Date().getTime();
//   }
// }

if (typeof module !== 'undefined') {
  module.exports = { info };
  // module.exports = { info, getConfig };
}

// I don't know..., check if browser.
// Node has process defined.
if (browserContext()) {
  window.info = info;
  // window.getConfig = getConfig;
}
