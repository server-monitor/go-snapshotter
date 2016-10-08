
// I don't know..., check if browser.
// Node has process.env => keys.length > 0 defined.
// This will probably fail in the future. I just know it.
function browserContext() {
  if (typeof window === 'undefined') return false;
  return true;
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

if (browserContext()) {
  window.info = info;
} else {
  module.exports = { info };
}
