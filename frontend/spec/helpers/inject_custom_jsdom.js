
// Based on http://jaketrent.com/post/testing-react-with-jsdom/
import jsdom from 'jsdom';

(() => {
  // var jsdom = require('jsdom');

  // setup the simplest document possible
  const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');

  // get the window object out of the document
  const win = doc.defaultView;

  // set globals for mocha that make access to document and window feel
  // natural in the test environment
  global.document = doc;
  global.window = win;

  // // take all properties of the window object and also attach it to the mocha global object
  // // !!AFTER UPDATE, this whole thing will break things big time!!
  // //   Investigate and fix later.
  // const has = Object.prototype.hasOwnProperty;
  // Object.keys(window).forEach((key) => {
  //   if (has.call(window, key) && !(key in global)) {
  //     global[key] = window[key];
  //   }
  // });

  // ... original...
  // propagateToGlobal(win)

  // // from mocha-jsdom https://github.com/rstacruz/mocha-jsdom/blob/master/index.js#L80
  // function propagateToGlobal (window) {
  //   for (let key in window) {
  //     if (!window.hasOwnProperty(key)) continue
  //     if (key in global) continue

  //     global[key] = window[key]
  //   }
  // }
})();
