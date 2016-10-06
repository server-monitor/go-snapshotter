
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

// function sleepBlock(ms) {
//   const end = new Date().getTime() + ms;
//   let start = new Date().getTime();

//   while (start < end) {
//     start = new Date().getTime();
//   }
// }

if (typeof module !== 'undefined') {
  module.exports = { info };
}

// I don't know..., check if browser.
// Node has process defined.
if (browserContext()) {
  window.info = info;
}
